import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (typeof data === 'string') {
            return request.user[data];
        }
        return request.user;
    },
);