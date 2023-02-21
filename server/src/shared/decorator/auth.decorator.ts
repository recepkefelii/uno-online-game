import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class GetUserDecorator {
  static getUserData(data: string | undefined, ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  }
}

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  return GetUserDecorator.getUserData(data, ctx);
});
