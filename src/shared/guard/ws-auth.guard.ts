import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

export class WsAuthGuard extends AuthGuard {
    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient();
        const headers = client.handshake.headers;
        if (!headers.authorization) {
            return false;
        }
        const user = this.validateToken(headers.authorization);
        client['user'] = user;
        return true;
    }
}