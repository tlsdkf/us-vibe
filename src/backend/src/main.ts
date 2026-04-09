import { config } from "dotenv";

config();

import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ContractHttpFilter } from "./filters/contract-http.filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ContractHttpFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const msg = errors
          .flatMap((e) => Object.values(e.constraints ?? {}))
          .join("; ");
        return new BadRequestException({
          code: "VALIDATION_ERROR",
          message: msg || "Validation failed"
        });
      }
    })
  );
  await app.listen(4000);
}

void bootstrap();
