import {Role} from "./register/user.model";

export interface Profile {
  profileId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  accountStatus: Role[];
  paymentAmount: number | null;
  paymentDueDate: Date;
}
