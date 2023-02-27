import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { verify } from "jsonwebtoken";
import { Player } from "src/entities/player.entity";
import { Repository } from "typeorm";

@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private readonly configService: ConfigService
    ) { }

    async getUserGameId(name: string) {
        const player = await this.playerRepository.findOneOrFail({
            where: { name },
            relations: {
                game: true
            }
        })
        const data = {
            id: player.game.id,
            status: player.game.status
        }
        return data
    }



    // init token validate socket gateway
    validateToken(auth: string) {
        const token = auth.split(' ')[1];
        const decoded = this.verifyToken(token);
        return decoded;
    }

    verifyToken(token: string) {
        return verify(token, this.configService.get('JWT_KEY'));
    }
}