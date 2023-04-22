import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/app.service';

@Module({
	providers: [UserService, PrismaService],
	controllers: [UserController],
})
export class UserModule { }
