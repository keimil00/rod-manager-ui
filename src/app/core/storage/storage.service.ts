import { Injectable } from '@angular/core';
import {AuthResponse} from "../auth/auth-response.model";
import {Role} from "../../features/register/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userRolesSubject = new BehaviorSubject<Role[]>(this.getRoles());
  currentRoles = this.userRolesSubject.asObservable();
  constructor() { }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    const expirationTime = new Date().getTime() + 300000;
  }

  updateAccessToken(access: string) {
    localStorage.setItem('access', access);
  }

  setRoles(roles: Role[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
    this.userRolesSubject.next(roles);
  }

  getRoles() {
    const rolesFromLocalStorage = JSON.parse(localStorage.getItem('roles') || '[]');

    if (rolesFromLocalStorage.length === 0) {
      return [];
    } else {
      return rolesFromLocalStorage;
    }
  }

  clearRoles(): void {
    localStorage.removeItem('roles');
    this.userRolesSubject.next([]);
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
    console.log('Getting refresh token' + localStorage.getItem('refresh'));
    return localStorage.getItem('refresh');
  }

  clearTokens(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
