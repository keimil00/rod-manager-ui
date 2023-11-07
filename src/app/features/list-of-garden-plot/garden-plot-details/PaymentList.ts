
export interface Payment {
  value: number;
  date: Date
  [key: string]: any;
}

export interface PaymentList {
  id: string
  idUser: string;
  userPaymentList: Payment[];
}
