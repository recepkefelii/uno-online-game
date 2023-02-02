import { Injectable } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"


@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RulesGateway {
  @WebSocketServer() server: Server


  @SubscribeMessage("deneme")
  deneme(@MessageBody() body: any) {
    console.log(body);
  }
}