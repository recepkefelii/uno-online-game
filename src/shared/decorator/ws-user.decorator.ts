import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const UserDecorator = createParamDecorator((data: undefined, ctx:ExecutionContext) => {
    const user = ctx.switchToWs().getClient()
    return data ? user.user[data] : user.user;
})

export default UserDecorator