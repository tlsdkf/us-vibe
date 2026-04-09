import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, type JwtModuleOptions } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret:
          config.get<string>("JWT_SECRET") ?? "dev-secret-change-in-production",
        signOptions: {
          expiresIn:
            (config.get<string>("JWT_EXPIRES_IN") ?? "7d") as NonNullable<
              JwtModuleOptions["signOptions"]
            >["expiresIn"]
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtModule, AuthService, JwtAuthGuard]
})
export class AuthModule {}
