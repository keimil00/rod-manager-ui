import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginUser, User} from "../../features/register/user.model";
import {AuthResponse} from "./auth-response.model";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {

  baseUrl = '/api/';

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}register`, user);
  }

  login(user: LoginUser): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}login/`, user);
  }

}
