import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class SocketService {
  private readonly logger: Logger;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.logger = new Logger(SocketService.name);
  }

  async saveUserCards(userId: string, cards: any[]): Promise<void> {
    const key = `user:${userId}`;
    const result = await this.redis.hset(key, 'cards', JSON.stringify(cards));
    if (result !== 1 && result !== 0) {
      throw new HttpException('Failed to save user cards', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserCards(userId: string): Promise<any[]> {
    const key = `user:${userId}`;
    const cardsString = await this.redis.hget(key, 'cards');
    if (!cardsString) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const cards = JSON.parse(cardsString);
    return cards;
  }
}
