import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {StorageService} from "../storage/storage.service";
import {AuthService} from "../auth/auth.service";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {AuthResponse} from "../auth/auth-response.model";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private storage: StorageService, private authService: AuthService, private toastr: ToastrService) {
        this.storage = storage;
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.storage.getAccessToken();
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else {
                this.toastr.error('Wystąpił nieoczekiwany problem');
                console.log(error)
                return throwError(error);
            }
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((authResponse: any) => {
                    this.isRefreshing = false;
                    this.storage.updateAccessToken(authResponse.access)
                    this.refreshTokenSubject.next(authResponse.access);
                    return next.handle(this.addToken(request, authResponse.access));
                }),
                catchError(error => {
                    // Handle refresh token failure
                    this.isRefreshing = false;
                    // Perform logout or redirect to login page
                    this.authService.logout(); // Assuming logoutUser() is a method to handle logout
                    return throwError(error);
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(request, token));
                }));
        }
    }

    private addToken(request: HttpRequest<unknown>, token: string) {
        return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
}
