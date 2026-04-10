import { createDataSourceOptions } from "@us-vibe/backend";
import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot(
      createDataSourceOptions() as TypeOrmModuleOptions
    )
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
