import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class userController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() body: userDto) {     
        return await this.userService.newUser(body)
    }
}