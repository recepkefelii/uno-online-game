import { CacheModule, CacheStore, Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { Player } from 'src/entities/player.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Player]),
    CacheModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
            store: await redisStore({
                url: configService.get("REDIS_URI"),
                ttl: 100000
            }),
        }),
        inject: [ConfigService]
    })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
