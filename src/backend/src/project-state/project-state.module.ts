import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ProjectStateController } from "./project-state.controller";
import { ProjectStateService } from "./project-state.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProjectStateController],
  providers: [ProjectStateService]
})
export class ProjectStateModule {}
