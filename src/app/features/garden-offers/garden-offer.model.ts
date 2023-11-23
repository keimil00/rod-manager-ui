export class GardenOffer {
  title!: string;
  content!: string;
  contact!: Contact;
  gardenInfo!: GardenInfo;
  createdAt!: Date;
}

export class Contact {
  name!: string;
  phone!: string;
  email!: string;
}

export class GardenInfo {
  postNumber!: number;
  address!: string;
  area!: number;
  price!: number;
  predictedRent!: number;
}
