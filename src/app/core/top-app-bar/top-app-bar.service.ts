import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopAppBarService {

  constructor() { }

  fetchNotifications() {
    return of({complaints: 6, payments: '!'})
  }
}
