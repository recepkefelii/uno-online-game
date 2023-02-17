import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

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
}
