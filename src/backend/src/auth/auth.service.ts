import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

export type UserPublic = {
  id: string;
  email: string;
  createdAt: string;
};

export type AuthResponseBody = {
  user: UserPublic;
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseBody> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });
    if (existing) {
      throw new ConflictException({
        code: "EMAIL_EXISTS",
        message: "Email already registered"
      });
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash
      }
    });

    return this.buildAuthResponse(user.id, user.email, user.createdAt);
  }

  async login(dto: LoginDto): Promise<AuthResponseBody> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });
    if (!user) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    const match = await bcrypt.compare(dto.password, user.passwordHash);
    if (!match) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    return this.buildAuthResponse(user.id, user.email, user.createdAt);
  }

  private async buildAuthResponse(
    id: string,
    email: string,
    createdAt: Date
  ): Promise<AuthResponseBody> {
    const accessToken = await this.jwt.signAsync({
      sub: id,
      email
    });
    return {
      user: {
        id,
        email,
        createdAt: createdAt.toISOString()
      },
      accessToken
    };
  }
}
