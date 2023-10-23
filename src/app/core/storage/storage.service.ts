import { Injectable } from '@angular/core';
import {AuthResponse} from "../auth/auth-response.model";
import {Role} from "../../features/register/user.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setTokens(tokens: AuthResponse): void {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
  }

  setRoles(roles: Role[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getRoles() {
    const rolesFromLocalStorage = JSON.parse(localStorage.getItem('roles') || '[]');

    if (rolesFromLocalStorage.length === 0) {
      return [Role.ROLE_MANAGER];
    } else {
      return rolesFromLocalStorage;
    }
  }

  clearRoles(): void {
    localStorage.removeItem('roles');
  }

  setLoggedIn(loggedIn: boolean): void {
    localStorage.setItem('loggedIn', loggedIn.toString());
  }

  getLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
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
