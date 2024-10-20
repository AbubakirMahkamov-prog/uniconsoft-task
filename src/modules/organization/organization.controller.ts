
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AddRemoveUserDto } from './dto/add-remove-user.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags("Organizations")
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  
  @ApiBody({
		type: CreateOrganizationDto,
		description: "CreateOrganization",
	})
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: CreateOrganizationDto) {
    //created_by_id must be get from  inside decoded token. I get from frontend temporary
    const result = await this.organizationService.createOrganization(data);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.organizationService.getAllOrganizations();
    return result;
  }
  
  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.organizationService.getOrganizationById(id);
    return result;
  }

  @ApiBody({
		type: UpdateOrganizationDto,
		description: "UpdateOrganization",
	})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateOrganizationDto) {
    const result = await this.organizationService.updateOrganization(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.organizationService.deleteOrganization(id);
    return { message: 'Organization deleted successfully' };
  }
  
  @Post('/add-user')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addUser(@Body() data: AddRemoveUserDto) {
    await this.organizationService.addUser(data);
    return {
      message: "User added successfully to Organization"
    };
  }
  
  @Get('/:org_id/users')
  async getUsersByOrgId(@Param('org_id') org_id: string) {
    const result = await this.organizationService.getOrgUsers(org_id);
    return result; 
  }

  @Delete('/:org_id/users/:user_id')
  async deletOrgUser(@Param('org_id') org_id: string, @Param('user_id') user_id: string) {
    await this.organizationService.delUserOrg({
      org_id,
      user_id
    });
    return {
      message: 'User deleted successfully from Organization!'
    };
  }

}
