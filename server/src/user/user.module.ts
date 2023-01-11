import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    providers: [UserService],
    controllers: [userController]
})
export class UserModule {}
