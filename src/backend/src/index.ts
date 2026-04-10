export const BACKEND_PACKAGE_VERSION = "0.1.0";

export function getBackendPackageLabel(): string {
  return "us-vibe-backend";
}

export { AppDataSource, createDataSourceOptions } from "./data-source";
export { CollaborationEvent, typeOrmEntities, User } from "./entities";
export { CollaborationEventsDataService } from "./collaboration/collaboration-events-data.service";
export { UsersDataService } from "./users/users-data.service";
