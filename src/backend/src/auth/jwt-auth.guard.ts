import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";

type JwtPayload = { sub: string; email?: string };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const header = req.headers.authorization;
    if (typeof header !== "string" || !header.startsWith("Bearer ")) {
      throw new UnauthorizedException({
        code: "UNAUTHORIZED",
        message: "Missing or invalid access token"
      });
    }
    const token = header.slice("Bearer ".length).trim();
    if (!token) {
      throw new UnauthorizedException({
        code: "UNAUTHORIZED",
        message: "Missing or invalid access token"
      });
    }
    try {
      const payload = this.jwt.verify<JwtPayload>(token);
      if (typeof payload.sub !== "string" || !payload.sub) {
        throw new Error("invalid sub");
      }
      (req as Request & { user: { sub: string } }).user = { sub: payload.sub };
      return true;
    } catch {
      throw new UnauthorizedException({
        code: "UNAUTHORIZED",
        message: "Missing or invalid access token"
      });
    }
  }
}
