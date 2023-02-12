import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { userDto } from './dto/user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    logger: Logger
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>,
    ) {
        this.logger = new Logger(UserService.name)
    }

    async newUser(body: userDto) {
        try {
            const player = new Player()
            const saltRounds = 10;
            const hashName = await bcrypt.hash(body.name, saltRounds);
            player.hash = hashName
            player.name = body.name
            player.currentTurn = false

            const user = await this.playerRepository.save(player)
            this.logger.log(`User named ${player.name} has been successfully created`)
            return { nickname: user.name }
        } catch (error) {
            this.logger.error(`Error while creating user: ${error}`)
            throw new HttpException('This username is already used', HttpStatus.BAD_REQUEST)
        }
    }

}
