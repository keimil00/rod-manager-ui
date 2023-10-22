import { Injectable } from '@angular/core';
import {AuthResponse} from "../auth/auth-response.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setTokens(tokens: AuthResponse): void {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  clearTokens(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
