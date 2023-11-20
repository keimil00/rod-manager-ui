import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take} from 'rxjs';
import {StorageService} from "../storage/storage.service";
import {AuthService} from "../auth/auth.service";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {AuthResponse} from "../auth/auth-response.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private storage: StorageService, private authService: AuthService) {
    this.storage = storage;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request url: ' + request.url);
    const accessToken = this.storage.getAccessToken();

    if (this.callsAuthenticatedUrls(request) && new Date().getTime() > this.storage.getTimestamp() && this.storage.getLoggedIn()) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authService.refreshToken().pipe(
          switchMap((authResponse: AuthResponse) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(authResponse.access);
            this.storage.setTokens(authResponse.access, authResponse.refresh);
            return next.handle(this.addToken(request, authResponse.access));
          }),
          catchError((err) => {
              this.refreshTokenInProgress = false;
              this.authService.logout();
              console.log('Error in refresh token interceptor: ' + err);
              return next.handle(request);
            }
          ));
      } else {
        return this.refreshTokenSubject.pipe(
          filter(result => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.addToken(request, accessToken!));
          })
        );
      }
    }
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request);
  }

  callsAuthenticatedUrls(request: HttpRequest<unknown>): boolean {
    return [...Object.values(API_ENDPOINTS.authenticated)].some(url => request.url.includes(url));
  }

  private addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}
