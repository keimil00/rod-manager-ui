export interface Fee {
    feeID: number
    name: string;
    type: TypeOfFee,
    value: number
}

export enum TypeOfFee {
    PerMeter = "Za metr",
    PerGardenPlot = "Za działke"
}
export interface UtilityValues {
    electricValue: number,
    waterValue: number
}

export interface Payments {
    leaseFees: Fee[];
    utilityFees: Fee[];
    additionalFees: Fee[];
    date: Date;
    utilityValues: UtilityValues;
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
