export class User {
  username!: string;
  password!: string;
  name!: string;
  surname!: string;
}

export class LoginUser {
  username!: string;
  password!: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  GARDENER = 'GARDENER',
  TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
  NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
}
