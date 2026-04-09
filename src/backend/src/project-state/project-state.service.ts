import { ConflictException, Injectable } from "@nestjs/common";
import type { ProjectState } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PutProjectStateDto } from "./dto/put-project-state.dto";

export type ProjectStateResponseBody = {
  stateVersion: number;
  approvedRequirements: string[];
  rejectedDecisions: string[];
  openQuestions: string[];
  currentApiSpecs: string[];
};

@Injectable()
export class ProjectStateService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateForUser(userId: string): Promise<ProjectStateResponseBody> {
    const row = await this.ensureRow(userId);
    return this.toBody(row);
  }

  async putForUser(
    userId: string,
    dto: PutProjectStateDto
  ): Promise<ProjectStateResponseBody> {
    await this.ensureRow(userId);

    const updated = await this.prisma.projectState.updateMany({
      where: { userId, stateVersion: dto.stateVersion },
      data: {
        approvedRequirements: dto.approvedRequirements,
        rejectedDecisions: dto.rejectedDecisions,
        openQuestions: dto.openQuestions,
        currentApiSpecs: dto.currentApiSpecs,
        stateVersion: { increment: 1 }
      }
    });

    if (updated.count === 0) {
      throw new ConflictException({
        code: "STATE_VERSION_CONFLICT",
        message: "Project state was modified; refresh and retry"
      });
    }

    const row = await this.prisma.projectState.findUniqueOrThrow({
      where: { userId }
    });
    return this.toBody(row);
  }

  private async ensureRow(userId: string): Promise<ProjectState> {
    const existing = await this.prisma.projectState.findUnique({
      where: { userId }
    });
    if (existing) {
      return existing;
    }
    return this.prisma.projectState.create({
      data: {
        userId,
        stateVersion: 1,
        approvedRequirements: [],
        rejectedDecisions: [],
        openQuestions: [],
        currentApiSpecs: []
      }
    });
  }

  private toBody(row: ProjectState): ProjectStateResponseBody {
    return {
      stateVersion: row.stateVersion,
      approvedRequirements: row.approvedRequirements,
      rejectedDecisions: row.rejectedDecisions,
      openQuestions: row.openQuestions,
      currentApiSpecs: row.currentApiSpecs
    };
  }
}
