import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { Card } from 'src/entities/card.entity';
import { Move } from 'src/entities/move.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[TypeOrmModule.forFeature([Player])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
