export const BACKEND_PACKAGE_VERSION = "0.1.0";

export function getBackendPackageLabel(): string {
  return "us-vibe-backend";
}

export { AppDataSource, createDataSourceOptions } from "./data-source";
export { typeOrmEntities } from "./entities";
