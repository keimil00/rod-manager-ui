import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TopAppBarService {

  fetchNotificationsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  startInterval: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  fetchNotifications() {
    return this.httpClient.get<any>('api/notifications/new/');
  }
}
