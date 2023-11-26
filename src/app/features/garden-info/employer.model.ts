export class Employer {
  id: number
  position: string;
  name: string;
  phoneNumber: string;
  email: string;

  constructor(id: number, position: string, name: string, phoneNumber: string, email: string) {
    this.id = id
    this.position = position;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
