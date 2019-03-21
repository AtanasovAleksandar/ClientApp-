import { UserProfile } from "./user-profile";
import { SimpleClaim } from "./simple-claim";

export class AuthContext {
  userProfile: UserProfile;
  claims: SimpleClaim[];
}