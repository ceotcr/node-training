import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const UserAgent = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (request && request.headers['user-agent']) {
            return request.headers['user-agent'];
        }
        throw new Error("User-Agent header is missing");
    }
)