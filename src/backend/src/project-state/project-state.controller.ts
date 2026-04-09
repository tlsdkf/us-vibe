import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { CurrentUserId } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PutProjectStateDto } from "./dto/put-project-state.dto";
import { ProjectStateService } from "./project-state.service";

@Controller("project-state")
@UseGuards(JwtAuthGuard)
export class ProjectStateController {
  constructor(private readonly projectState: ProjectStateService) {}

  @Get()
  get(@CurrentUserId() userId: string) {
    return this.projectState.getOrCreateForUser(userId);
  }

  @Put()
  put(@CurrentUserId() userId: string, @Body() dto: PutProjectStateDto) {
    return this.projectState.putForUser(userId, dto);
  }
}
