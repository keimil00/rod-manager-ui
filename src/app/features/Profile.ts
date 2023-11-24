import {Role} from "./register/user.model";

export interface Profile {
  profileId: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  groups: Role[];
  paymentAmount: number | null;
  paymentDueDate: Date;
}
