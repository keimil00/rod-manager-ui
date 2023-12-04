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

const translatedRoles: Record<string, string> = {
  [Role.ADMIN]: 'Administrator',
  [Role.MANAGER]: 'Zarządca',
  [Role.GARDENER]: 'Działkowicz',
  [Role.TECHNICAL_EMPLOYEE]: 'Pracownik techniczny',
  [Role.NON_TECHNICAL_EMPLOYEE]: 'Pracownik nietechniczny',
};

export function getTranslatedRole(role: string): string {
  return translatedRoles[role] || 'Nieznana rola';
}

