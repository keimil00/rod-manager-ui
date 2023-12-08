import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {ComplaintInfo, ComplaintWithMessages} from "./complaint.model";
import {Page} from "../../shared/paginator/page.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private httpClient: HttpClient) { }

  fetchComplaints(): Observable<Page<ComplaintInfo>> {
    return this.httpClient.get<Page<ComplaintInfo>>(API_ENDPOINTS.authenticated.getComplaints)
  }

  fetchComplaintsWithState(state: string): Observable<Page<ComplaintInfo>> {
    const params = new HttpParams()
      .set('state', state);
    return this.httpClient.get<Page<ComplaintInfo>>(API_ENDPOINTS.authenticated.getComplaints, {params})
  }

  fetchComplaintWithMessages(id: number): Observable<ComplaintWithMessages> {
    return this.httpClient.get<ComplaintWithMessages>(API_ENDPOINTS.authenticated.getComplaints + `${id}/`)
  }

  sendNewMessage(message: string, complaint: number): Observable<any> {
    return this.httpClient.post(API_ENDPOINTS.authenticated.sendComplaintMessage, {content: message, complaint: complaint})
  }

  createComplaint(title: string, message:string): Observable<any> {
    return this.httpClient.post(API_ENDPOINTS.authenticated.createComplaint, {title: title, message: message});
  }

  changeState(id: number, state: string): Observable<any> {
    return this.httpClient.patch(API_ENDPOINTS.authenticated.changeComplaintState + `${id}/`, {state: state});
  }
}
