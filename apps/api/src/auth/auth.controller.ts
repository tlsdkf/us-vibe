import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: { email?: string; password?: string }
  ): Promise<{ accessToken: string }> {
    return this.auth.register(String(body.email ?? ""), String(body.password ?? ""));
  }

  @Post("login")
  async login(
    @Body() body: { email?: string; password?: string }
  ): Promise<{ accessToken: string }> {
    return this.auth.login(String(body.email ?? ""), String(body.password ?? ""));
  }
}
