import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../Profile";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  private url = '/api/who-am-i/';


  getMyProfile(): Observable<any> {
    return this.httpClient.get<Profile>(this.url);
  }

}
