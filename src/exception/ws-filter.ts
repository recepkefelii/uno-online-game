import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
import { Server } from 'socket.io';
  import {
    WsBadRequestException,
    WsTypeException,
    WsUnknownException,
  } from './ws-exceptions';
  
  @Catch()
  export class WsCatchAllFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
      const socket: Server = host.switchToWs().getClient();
  
      if (exception instanceof BadRequestException) {
        const exceptionData = exception.getResponse();
        const exceptionMessage =
          exceptionData['message'] ?? exceptionData ?? exception.name;
  
        const wsException = new WsBadRequestException(exceptionMessage);
        socket.emit('exception', wsException.getError());
        return;
      }
  
      if (exception instanceof WsTypeException) {
        socket.emit('exception', exception.getError());
        return;
      }
  
      const wsException = new WsUnknownException(exception.message);
      socket.emit('exception', wsException.getError());
    }
  }