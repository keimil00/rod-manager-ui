import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../storage/storage.service";
import {AuthService} from "../auth/auth.service";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService, private authService: AuthService) {
    this.storage = storage;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.storage.getAccessToken();

    if (!this.callsNonAuthenticatedUrls(request) && this.storage.getTimestamp() < new Date().getTime()) {
      this.authService.refreshToken();
    }
    if (this.callsAuthenticatedUrls(request) && accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request);
  }

  callsNonAuthenticatedUrls(request: HttpRequest<unknown>): boolean {
    return [...Object.values(API_ENDPOINTS.public)].some(url => request.url.includes(url));
  }

  callsAuthenticatedUrls(request: HttpRequest<unknown>): boolean {
    return [...Object.values(API_ENDPOINTS.authenticated)].some(url => request.url.includes(url));
  }
}
