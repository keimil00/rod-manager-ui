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
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MANAGER = 'ROLE_MANAGER',
  ROLE_GARDENER = 'ROLE_GARDENER',
  ROLE_EMPLOYEE = 'ROLE_EMPLOYEE',
}
