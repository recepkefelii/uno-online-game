import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';


export class RedisCacheService {
    constructor(private readonly redisService: RedisService) { }

    async get(key: string): Promise<string | null> {
        return await this.redisService.getClient().get(key);
    }

    async set(key: string, value: string): Promise<void> {
        await this.redisService.getClient().set(key, value);
    }

    async del(key: string): Promise<number> {
        return await this.redisService.getClient().del(key);
    }
}
