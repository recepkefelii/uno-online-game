import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>
    ) { }

    async newUser(name: string) {
       const newUser = await this.playerRepository.save(
        {
            name:name
        }
       )
       return newUser
        
    }
}
