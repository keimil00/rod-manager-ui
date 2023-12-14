export interface Fee {
  id: number;
  name: string;
  calculation_type: CalculationType;
  value: number;
  fee_type?: FeeType;
  calculated_value?: number;
  billing_period?: number;
}

export enum CalculationType {
  PerMeter = "Za metr",
  PerGardenPlot = "Za działkę"
}

export enum FeeType {
  Lease = 'Lease',
  Utility = 'Utility',
  Additional = 'Additional'
}

export interface UtilityValues {
  electricValue: number,
  waterValue: number
}

export interface Payments {
  lease_fees: Fee[];
  utility_fees: Fee[];
  additional_fees: Fee[];
  payment_date: Date;
  end_date: Date;
  billing_period: number;
  is_confirmed: boolean;
}

export interface IndividualPayment {
  paymentID: number
  name: string,
  value: number,
  date: Date
}

export interface IndividualPayments {
  userID: number,
  paymentsList?: IndividualPayment[]
}

export enum MediaType {
  Water = 'Woda', Electricity = 'Prąd'
}
