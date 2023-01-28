import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"


@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RulesGateway{
    @WebSocketServer() server : Server


    @SubscribeMessage("deneme")
    deneme(){
      console.log("merhaba");
      
    }
}