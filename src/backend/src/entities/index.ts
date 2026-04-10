import { User } from "./user.entity";

/** Register TypeORM entities here; migrations and Nest use the same list. */
export const typeOrmEntities: (string | Function)[] = [User];

export { User } from "./user.entity";
