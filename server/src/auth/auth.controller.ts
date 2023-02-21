import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/shared/decorator/auth.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AuthService } from './auth.service';
import { IGetUserType } from 'src/game/interface/user.interface';
import { AuthDto, UpdateDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    async register(@Body() body: AuthDto) {
        return await this.authService.register(body)
    }

    @Post('login')
    async login(@Body() body: AuthDto) {
        return await this.authService.login(body)
    }
    @Patch('update')
    @UseGuards(AuthGuard)
    async update(@Body() body: UpdateDto, @GetUser() user: IGetUserType) {
        return this.authService.update(body, user)
    }
}
