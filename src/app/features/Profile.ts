export interface Profile {
  id: string;
  userID: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  accountStatus: Role_temp[];
  paymentAmount: number | null;
  paymentDueDate: Date;
}

export enum Role_temp {
  USER = 'UŻYTKOWNIK',
  ADMIN = 'ADMINISTRATOR',
  MANAGER = 'Zarządca ogrodu',
  GARDENER = 'Działkowiec',
  EMPLOYEE = 'PRACOWNIK',
}
