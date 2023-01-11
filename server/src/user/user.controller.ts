import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class userController{
    constructor(private readonly userService:UserService ){}

    @Post('register')
    register(@Body() body:userDto){
        return this.userService.newUser(body)
    }
}