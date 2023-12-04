export class GardenOffer {
  title!: string;
  body!: string;
  contact!: Contact;
  gardenInfo!: GardenInfo;
  createdAt!: Date;
}

export class GardenOfferExternal {
  id!: number;
  title!: string;
  body!: string;
  contact!: Contact;
  garden_info!: GardenInfoExternal;
  created_at!: Date;
}

export class Contact {
  id?: number;
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

export class GardenInfoExternal {
  address!: string;
  area!: number;
  price!: number;
  predicted_rent!: number;
}

export class GardenData {
  id!: string;
  sector!: string;
  avenue!: string;
  number!: number;
  area!: number;
  status!: string;
}

class GardenInfoCreate {
  id!: number;
  price!: number;
  predicted_rent!: number;
}

export class GardenOfferCreate {
  title!: string;
  body!: string;
  contact_id!: number;
  garden_info!: GardenInfoCreate;
}

export class Filters {
  area_max!: number;
  area_min!: number;
  predicted_rent_max!: number;
  predicted_rent_min!: number;
  price_max!: number;
  price_min!: number;
  sort_by!: string;
  sort_order!: string;
}

export class MinMax {
  min_price!: number;
  max_price!: number;
  min_area!: number;
  max_area!: number;
  min_predicted_rent!: number;
  max_predicted_rent!: number;
}
