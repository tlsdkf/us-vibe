import { createDataSourceOptions } from "@us-vibe/backend";
import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { CollaborationModule } from "./collaboration/collaboration.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(
      createDataSourceOptions() as TypeOrmModuleOptions
    ),
    AuthModule,
    CollaborationModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
