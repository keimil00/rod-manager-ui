import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {StorageService} from "../storage/storage.service";
import {Role} from "../../features/register/user.model";

export function authGuard(requiredRoles: Role[]): CanActivateFn {
  return () => {
    const userRoles = inject(StorageService).getRoles();
    return requiredRoles.some(role => userRoles.includes(role))
  };
}
