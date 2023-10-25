export class Employer {
  position: string;
  name: string;
  phoneNumber: string;
  email: string;

  constructor(position: string, name: string, phoneNumber: string, email: string) {
    this.position = position;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
