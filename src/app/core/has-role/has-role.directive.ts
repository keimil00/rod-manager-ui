import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Role} from "../../features/register/user.model";
import {StorageService} from "../storage/storage.service";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input() set appHasRole(requiredRoles: Role[]) {
    const userRoles = this.storageService.getRoles();
    if (requiredRoles.some(role => userRoles.includes(role))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private storageService: StorageService
  ) {}
}
