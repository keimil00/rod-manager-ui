import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";
import {StorageService} from "./core/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rod-manager-ui';

  constructor(private router: Router) {
  }

  isLessColorsComponentActive(): boolean {
    return this.router.url.includes('home') || this.router.url.includes('garden-offers');
  }

  isNotShowComponentActive(): boolean {
    return this.router.url.includes('calendar') || this.router.url.includes('404') || this.router.url.includes('403');
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expectedRoles: Set<string> = new Set(route.data['expectedRoles']);
    const userRoles: Set<string> = new Set(this.storageService.getRoles());

    const hasPermission = [...userRoles].some(role => expectedRoles.has(role));

    if (!this.storageService.getLoggedIn() || !hasPermission) {
      this.router.navigate(['/403']);
      return false;
    }
    return true;
  }
}


