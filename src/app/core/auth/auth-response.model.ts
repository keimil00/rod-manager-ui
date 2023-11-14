import {Role} from "../../features/register/user.model";

export class AuthResponse {
  access!: string;
  refresh!: string;
  roles!: Role[];
}
