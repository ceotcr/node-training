import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ProfileService],
  imports: [UserModule],
  controllers: [ProfileController]
})
export class ProfileModule { }
