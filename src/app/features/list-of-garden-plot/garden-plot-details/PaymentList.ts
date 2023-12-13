
export interface Payment {
  value: number;
  date?: Date
  [key: string]: any;
}

export interface PaymentList {
  id: number
  idUser: number;
  userPaymentList: Payment[];
}

export interface UserPayment {
  id: number,
  user: number,
  type: string,
  date: string,
  amount: number,
  description: string,
  related_fee: number
}

export interface UserPaymentUpload {
  user?: number,
  type?: string,
  date?: string,
  amount?: number,
  description?: string
}

export enum PaymentType {
  BillPayment= 'BillPayment', Correction = 'Correction', Individual='Individual', Payment='Payment'
}
