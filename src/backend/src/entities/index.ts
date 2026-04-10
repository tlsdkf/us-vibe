import { CollaborationEvent } from "./collaboration-event.entity";
import { User } from "./user.entity";

/** Register TypeORM entities here; migrations and Nest use the same list. */
export const typeOrmEntities: (string | Function)[] = [User, CollaborationEvent];

export { CollaborationEvent } from "./collaboration-event.entity";
export { User } from "./user.entity";
