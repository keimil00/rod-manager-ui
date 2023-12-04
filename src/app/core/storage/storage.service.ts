import { Injectable } from '@angular/core';
import {AuthResponse} from "../auth/auth-response.model";
import {Role} from "../../features/register/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // private userRolesSubject = new BehaviorSubject<Role[]>([]);

  constructor() { }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    const expirationTime = new Date().getTime() + 300000;
    localStorage.setItem('timestamp', expirationTime.toString());
  }

  getTimestamp(): number {
    return Number(localStorage.getItem('timestamp'));
  }

  setRoles(roles: Role[]): void {
    // console.log('Subject next: ' + roles)
    // this.userRolesSubject.next(roles);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // getRolesSubject() {
  //   return this.userRolesSubject;
  // }

  getRoles() {
    const rolesFromLocalStorage = JSON.parse(localStorage.getItem('roles') || '[]');

    if (rolesFromLocalStorage.length === 0) {
      return [];
    } else {
      return rolesFromLocalStorage;
    }
  }

  clearRoles(): void {
    // this.userRolesSubject.next([]);
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
    console.log('Getting refresh token' + localStorage.getItem('refresh'));
    return localStorage.getItem('refresh');
  }

  clearTokens(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
