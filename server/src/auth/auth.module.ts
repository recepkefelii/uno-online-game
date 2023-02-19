import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { RedisModule, RedisService } from 'nestjs-redis';
import { Player } from 'src/entities/player.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Player]), CacheModule.registerAsync({
        useFactory: async () => {
            const store = await redisStore({
                socket: {
                    host: 'localhost',
                    port: 6379,
                },
            });

            return {
                store: store as unknown as CacheStore,
                ttl: 60000000
            };
        }
    }),],
    controllers: [AuthController],
    providers: [AuthService, ConfigService],
})
export class AuthModule { }
