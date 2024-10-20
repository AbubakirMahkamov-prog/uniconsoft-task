
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags("/users")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
		type: CreateUserDto,
		description: "CreateUser",
	})
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    //created_by_id must be get from  inside decoded token. I get from frontend temporary
    const result = await this.userService.createUser(createUserDto);
    return result;
    
  }

  @Get()
  async findAll() {
    const result = await this.userService.getAllUsers();
    return result;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.userService.getUserById(id);
    return result;
  }

  @ApiBody({
		type: UpdateUserDto,
		description: "UpdateUser",
	})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    
    const result = await this.userService.updateUser(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
