import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { userDto } from './dto/user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>,
    ) { }

    async newUser(body: userDto) {
        const player = new Player()
        const saltRounds = 10;
        const hashName = await bcrypt.hash(body.name, saltRounds);
        player.hash = hashName
        player.name = body.name

        const user = await this.playerRepository.save(player)
        return { nickname: user.name }
    }
}
