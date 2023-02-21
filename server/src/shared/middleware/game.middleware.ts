import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GameMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log("middleware work");
    next();
  }
}
