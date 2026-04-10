import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ContractHttpExceptionFilter } from "./http-exception.filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ContractHttpExceptionFilter());
  app.enableCors();
  await app.listen(4000);
}

void bootstrap();
