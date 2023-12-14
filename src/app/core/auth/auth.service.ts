import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LoginUser, User} from "../../features/register/user.model";
import {AuthResponse} from "./auth-response.model";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {TopAppBarService} from "../top-app-bar/top-app-bar.service";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {
  baseUrl = '/api/';

  constructor(private httpClient: HttpClient,
              private storageService: StorageService,
              private router: Router,
              private topAppBarService: TopAppBarService) {
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(API_ENDPOINTS.public.register, user);
  }

  loginGoogle(token: string): Observable<any> {
    return this.httpClient.post<any>(API_ENDPOINTS.public.loginGoogle, {token: token}).pipe(
      tap(value => {
        this.storageService.setLoggedIn(true);
        this.topAppBarService.startInterval.next(true);
      })
    );
  }

  login(user: LoginUser): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(API_ENDPOINTS.public.login, user).pipe(
      tap(value => {
        this.storageService.setLoggedIn(true);
        this.topAppBarService.startInterval.next(true);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.storageService.getRefreshToken();
    console.log('Refresh token in auth:' + refreshToken)
    return this.httpClient.post<AuthResponse>(API_ENDPOINTS.public.refreshToken,
      {refresh: this.storageService.getRefreshToken()});
  }

  logout(): void {
    this.storageService.clearTokens();
    this.storageService.clearRoles();
    this.storageService.setLoggedIn(false);
    this.topAppBarService.startInterval.next(false);
    this.router.navigate(['/login']);
  }

}
