import { Module } from '@nestjs/common';
import { userGateway } from './user.gateway';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    providers: [UserService, userGateway]
})
export class UserModule {}
