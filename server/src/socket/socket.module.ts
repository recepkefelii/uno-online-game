import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { SocketGateWay } from './socket.gateway';

@Module({
    imports :  [],
    providers: [SocketGateWay]
})
export class SocketModule {

}
