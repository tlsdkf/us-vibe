import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest<Request & { user?: { sub: string } }>();
    const sub = req.user?.sub;
    if (!sub) {
      throw new Error("JwtAuthGuard must run before CurrentUserId");
    }
    return sub;
  }
);
