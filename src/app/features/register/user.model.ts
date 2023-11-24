export class User {
  email!: string;
  password!: string;
  first_name!: string;
  last_name!: string;
}

export class LoginUser {
  email!: string;
  password!: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  GARDENER = 'GARDENER',
  TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
  NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
}
// }export enum Role {
//   ADMIN = 'ADMIN',
//   MANAGER = 'Zarządca',
//   GARDENER = 'Działkowicz',
//   TECHNICAL_EMPLOYEE = 'pracownik_techniczny',
//   NON_TECHNICAL_EMPLOYEE = 'pracownik_nie_techniczny',
// }
