import {Role_TEMP} from "../Profile";
import {additionalFees, leaseFees, utilityFees} from "./payments.component";

export interface Fee {
  name: string;
  type: TypeOfFee,
  value: number
}

export enum TypeOfFee {
  PerMeter = "Za metr",
  PerGardenPlot = "Za działke"
}

export interface Payments{
  leaseFees:Fee[];
  utilityFees:Fee[];
  additionalFees:Fee[];
  date:Date;
}
