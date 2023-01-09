import { WebSocketGateway ,SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { UserService } from './user.service';

@WebSocketGateway()
export class userGateway{
    constructor(private readonly userService:UserService ){}

    @SubscribeMessage('newUser')
    newUser(@MessageBody() name:string){
       return this.userService.newUser(name)
    }
}