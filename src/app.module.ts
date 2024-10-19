import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [SharedModule, UserModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
