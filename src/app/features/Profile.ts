
export interface Profile {
  id:string;
  userID:string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  plotID: string;
  accountStatus: Role;
  paymentAmount : number;
  paymentDueDate : Date;
}

export enum Role {
  USER = 'UŻYTKOWNIK',
  ADMIN = 'ADMINISTRATOR',
  MANAGER = 'Zarządca ogrodu',
  GARDENER = 'Działkowiec',
  EMPLOYEE = 'PRACOWNIK',
}
