import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Role} from "../../features/register/user.model";
import {StorageService} from "../storage/storage.service";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnDestroy {
  private rolesSubscription: Subscription;
  private allowedRoles: Role[] = [];

  constructor(
      private storageService: StorageService,
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef
  ) {
    this.rolesSubscription = this.storageService.currentRoles.subscribe(roles => {
      this.updateView(roles);
    });
  }

  @Input() set appHasRole(roles: Role[]) {
    this.allowedRoles = roles;
    // Check immediately on role input change, don't wait for subscription
    this.updateView(this.storageService.getRoles());
  }

  private updateView(roles: Role[]) {
    const hasRole = roles.some(role => this.allowedRoles.includes(role));

    if (hasRole) {
      if (!this.viewContainer.length) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.rolesSubscription.unsubscribe();
  }
}
