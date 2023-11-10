import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LoginUser, User} from "../../features/register/user.model";
import {AuthResponse} from "./auth-response.model";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {
  baseUrl = '/api/';

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  register(user: User): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}register`, user);
  }

  loginGoogle(token: string): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}login/google/`, {token: token});
  }

  login(user: LoginUser): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}login/`, user).pipe(
      tap( value => {
        this.storageService.setLoggedIn(true);
      })
    );
  }

  logout(): void {
    this.storageService.setLoggedIn(false);
    this.storageService.clearTokens();
    this.storageService.clearRoles();
    // TODO: call logout endpoint
  }

}
