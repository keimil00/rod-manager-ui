
export interface Payment {
  value: number;
  date: Date
  [key: string]: any;
}

export interface PaymentList {
  id: number
  idUser: number;
  userPaymentList: Payment[];
}
