import { UserProfile } from "./user-profile";
import { Project } from "./project";

export class UserPermission {
    userProfileId: string;
    projectId: number;
    value: string;
}