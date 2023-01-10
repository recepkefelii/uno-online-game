import { WebSocketGateway ,SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';

@WebSocketGateway()
export class userGateway{
    constructor(private readonly userService:UserService ){}

    @SubscribeMessage('newUser')
    newUser(@MessageBody() body:userDto){
       return this.userService.newUser(body)
    }
}