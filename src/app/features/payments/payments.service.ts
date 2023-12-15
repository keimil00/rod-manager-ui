import {Injectable} from '@angular/core';
import {Fee, IndividualPayment, IndividualPayments, Payments, CalculationType, UtilityValues} from "./payments";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {map, Observable, of} from "rxjs";
import {
  Payment,
  PaymentList,
  UserPayment,
  UserPaymentUpload
} from "../list-of-garden-plot/garden-plot-details/PaymentList";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {Period} from "./payments.model";
import {Page} from "../../shared/paginator/page.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private readonly URLpayments = '/api/payments/';
  private readonly URIuserConfirm = 'confirm-userspayments/';
  private readonly URIuserPayments = 'userspayments/';
  private readonly URIeditLeasefee = 'edit-lease-fee/';
  private readonly URIeditUtilityfee = 'edit-utility-fee/';
  private readonly URIeditAdditionalfee = 'edit-additional-fee/';
  private readonly URIeditUtilityValues = 'edit-utility-values/';
  private readonly URIeditDate = 'edit-date/';
  private readonly URIconfirmPayment = 'bill-payment/';

  constructor(private httpClient: HttpClient) {
  }

  getPaymentsForPeriod(period: Period): Observable<Payments> {
    return this.httpClient.get<Payments>(`/api/payments/fee/by-billing-period/${period.id}/`);
  }

  getCurrentPayments(): Observable<Payments> {
    return this.httpClient.get<Payments>('/api/payments/fee/current/');
  }

  getBillingPeriods() {
    return this.httpClient.get<Page<Period>>(`${this.URLpayments}billing-period/`).pipe(map(page => page.results))
  }

  createBillingPeriod(start_date: Date, end_date: Date) {
    return this.httpClient.post<Period>('/api/payments/billing-period/', {
      start_date: start_date.toISOString().slice(0, 10),
      end_date: end_date.toISOString().slice(0, 10)
    })
  }

  editFee(feeID: number, fee: Fee) {
    return this.httpClient.patch<Fee>(`/api/payments/fee/by-id/${feeID}`, fee);
  }

  addFee(fee: Fee) {
    return this.httpClient.post<Fee>(`/api/payments/fee/`, fee);
  }

  findUserPaymentsByAddress(sector: string | null, avenue: string | null, number: number | null): Observable<IndividualPayments | null> {
    const url = `${this.URLpayments}${this.URIuserPayments}?sector=${sector}&avenue=${avenue}&number=${number}`;
    return this.httpClient.get<IndividualPayments | null>(url);
  }

  findUserPaymentsByID(userID: number | undefined): Observable<IndividualPayments | null> {
    const url = `${this.URLpayments}${this.URIuserPayments}${userID}/`;
    return this.httpClient.get<IndividualPayments | null>(url);
  }

  addNewIndividualPayment(userID: number | undefined, individualPayment: IndividualPayment): Observable<any> {
    const url = `${this.URLpayments}${this.URIuserPayments}${userID}/`;
    return this.httpClient.patch(url, individualPayment);
  }

  deleteIndividualPayment(userID: number, paymentID: number): Observable<any> {
    const url = `${this.URLpayments}${this.URIuserPayments}/?paymentID=${paymentID}&userID=${userID}`;
    return this.httpClient.delete(url);
  }

  updateDate(date: Date, periodId: number): Observable<any> {
    const url = `${this.URLpayments}billing-period/by-id/${periodId}/`;
    return this.httpClient.patch(url, {payment_date: date.toISOString().slice(0, 10)});
  }

  confirmPeriod(periodId: number): Observable<any> {
    const url = `${this.URLpayments}billing-period/confirm/${periodId}/`;
    return this.httpClient.post(url, null);
  }


  getConfirmPayments(userId: number, index: number, size: number): Observable<Page<UserPayment>> {
    const url = `/api/payments/payment/${userId}/`;
    const params = new HttpParams()
        .set('page', index)
        .set('page_size', size)
    return this.httpClient.get<Page<UserPayment>>(url, {params});
  }


  getConfirmPayments2(user_id: number | undefined): Observable<Payment[]> {
    return of(this.confirmpaymentLists.find((user) => user.idUser === user_id)?.userPaymentList || []);
  }


  confirmPayment(payment: UserPaymentUpload): Observable<any> {
    const url = `${this.URLpayments}payment/`;
    return this.httpClient.post<any>(url, payment);
  }


  private confirmpaymentLists: PaymentList[] = [
    {
      id: 1,
      idUser: 1,
      userPaymentList: [
        {value: 325, date: new Date(2023, 10, 31)},
        {value: 230, date: new Date(2026, 10, 20)},
        {value: 280, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 2,
      idUser: 2,
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2450, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 3,
      idUser: 3,
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 234, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 4,
      idUser: 4,
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 432, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 5,
      idUser: 5,
      userPaymentList: [
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 76, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 6,
      idUser: 6,
      userPaymentList: [
        {value: 863, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 7,
      idUser: 7,
      userPaymentList: [
        {value: 754, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 8,
      idUser: 8,
      userPaymentList: [
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 434, date: new Date(2023, 10, 31)},
        {value: 34, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 9,
      idUser: 9,
      userPaymentList: [
        {value: 342, date: new Date(2023, 10, 31)},
        {value: 543, date: new Date(2026, 10, 31)},
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 435, date: new Date(2028, 10, 31)},
        {value: 2435, date: new Date(2029, 10, 20)}
      ]
    },
    {
      id: 10,
      idUser: 10,
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 11,
      idUser: 11,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 12,
      idUser: 12,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 13,
      idUser: 13,
      userPaymentList: [
        {value: 45345, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 14,
      idUser: 14,
      userPaymentList: [
        {value: 55, date: new Date(2023, 10, 31)},
        {value: 656, date: new Date(2021, 5, 31)},
        {value: 565, date: new Date(2020, 10, 31)},
        {value: 5464, date: new Date(2023, 10, 31)},
        {value: 465, date: new Date(2021, 17, 31)},
        {value: 654, date: new Date(2023, 10, 31)},
        {value: 2546, date: new Date(2020, 3, 31)},
        {value: 546, date: new Date(2021, 6, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 15,
      idUser: 15,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 16,
      idUser: 16,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 17,
      idUser: 17,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 18,
      idUser: 18,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 19,
      idUser: 19,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 20,
      idUser: 20,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    }];
}


