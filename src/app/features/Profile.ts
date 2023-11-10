export interface Profile {
  id: string;
  userID: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  plotID: string | null;
  accountStatus: Role[];
  paymentAmount: number | null;
  paymentDueDate: Date;
}

export enum Role {
  USER = 'UŻYTKOWNIK',
  ADMIN = 'ADMINISTRATOR',
  MANAGER = 'Zarządca ogrodu',
  GARDENER = 'Działkowiec',
  EMPLOYEE = 'PRACOWNIK',
}
