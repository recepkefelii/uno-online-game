import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { SocketGateWay } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
    imports :  [TypeOrmModule.forFeature([Player])],
    providers: [SocketGateWay,SocketService],
})
export class SocketModule {

}
