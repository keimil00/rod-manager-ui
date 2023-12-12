import {Injectable} from '@angular/core';
import {Fee, IndividualPayment, IndividualPayments, Payments, CalculationType, UtilityValues} from "./payments";
import {HttpClient} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {map, Observable, of} from "rxjs";
import {Payment, PaymentList} from "../list-of-garden-plot/garden-plot-details/PaymentList";
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
    console.log('Sending: ' + start_date + '-' + end_date);
    return this.httpClient.post<Period>('/api/payments/billing-period/', {start_date: start_date.toISOString().slice(0, 10), end_date: end_date.toISOString().slice(0, 10)})
  }

  editFee(feeID: number, fee: Fee) {
    return this.httpClient.patch<Fee>(`/api/payments/by-id/${feeID}`, fee);
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

  editLeaseFee(payments: Fee[]): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditLeasefee}`;
    return this.httpClient.patch(url, payments);
  }

  editUtilityFee(payments: Fee[]): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditUtilityfee}`;
    return this.httpClient.patch(url, payments);
  }

  editUtilityValues(values: UtilityValues): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditUtilityValues}`;
    return this.httpClient.patch(url, values);
  }

  editAdditionalFee(payment: Fee | undefined): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditAdditionalfee}`;
    return this.httpClient.patch(url, payment);
  }

  addAdditionalFee(payment: Fee): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditAdditionalfee}`;
    return this.httpClient.post(url, payment);
  }

  // TODO
  deleteAdditionalFee(feeID: number) {
    const url = `${this.URLpayments}${this.URIeditAdditionalfee}/?feeID=${feeID}`;
    return this.httpClient.delete(url);
  }

  updateDate(date: Date): Observable<any> {
    const url = `${this.URLpayments}${this.URIeditDate}`;
    return this.httpClient.patch(url, date);
  }

  confirmALLPayments(): Observable<any> {
    const url = `${this.URLpayments}`;
    return this.httpClient.put(url, null);
  }


  getConfirmPayments(userId: number | undefined): Observable<Payment[]> {
    const url = `${this.URLpayments}${this.URIuserConfirm}${userId}/`;
    return this.httpClient.get<Payment[]>(url);
  }

  confirmPayment(userId: number | undefined, payment: Payment): Observable<any> {
    //obizyc kwote do zaplaty
    const url = `${this.URLpayments}${this.URIuserConfirm}${userId}/`;
    return this.httpClient.patch<any>(url, payment);
  }
}


