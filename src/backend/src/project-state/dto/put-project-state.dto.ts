import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, Min } from "class-validator";

export class PutProjectStateDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  stateVersion!: number;

  @IsArray()
  @IsString({ each: true })
  approvedRequirements!: string[];

  @IsArray()
  @IsString({ each: true })
  rejectedDecisions!: string[];

  @IsArray()
  @IsString({ each: true })
  openQuestions!: string[];

  @IsArray()
  @IsString({ each: true })
  currentApiSpecs!: string[];
}
