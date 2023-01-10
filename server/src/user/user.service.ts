import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>
    ) { }

    async newUser(body: userDto) {
        const player = new Player()
        player.name= body.name
        return this.playerRepository.save(player)
    }
}
