import {Role} from "./register/user.model";

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  groups: Role[];
  balance: number;
  paymentDueDate: Date;
}
