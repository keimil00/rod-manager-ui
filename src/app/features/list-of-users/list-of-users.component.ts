import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";

import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {ListOfUsersService} from "./list-of-users.service";
import {Page} from "../../shared/paginator/page.model";
import {getTranslatedRole, Role} from "../register/user.model";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'accountStatus', 'info'];

  dataProfiles = new MatTableDataSource<Profile>();

  totalUsersCount: number = 0;
  DefoultpageSize = 10;

  currentPageIndex = 1;
  currentPageSize = this.DefoultpageSize;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private listOfUsersService: ListOfUsersService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    this.spinner.show()
    this.initData();
    this.dataProfiles.paginator = this.paginator;
  }

  private initData() {
    this.loadProfiles(this.currentPageIndex, this.DefoultpageSize)
  }

  loadProfiles(index: number, size: number): void {
    this.listOfUsersService.getProfiles(index, size).subscribe({
      next: (page: Page<Profile>) => {
        this.totalUsersCount = page.count;
        this.dataProfiles = new MatTableDataSource<Profile>(page.results);
        this.spinner.hide()
      }, error: err => {
        console.error(err);
        this.spinner.hide()
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }

  fetchData(pageIndex: number, pageSize: number): void {
    this.currentPageIndex = pageIndex;
    this.currentPageSize = pageSize;

    this.listOfUsersService.getProfiles(pageIndex, pageSize).subscribe(
      data => {
        this.totalUsersCount = data.count;
        this.dataProfiles = new MatTableDataSource<Profile>(data.results);
      },
      error => {
        console.error(error);
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      },
      () => {
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  navigateToProfileComponent(id: string) {
    this.router.navigate(['/user-info', id]);
  }

  mapAccountStatusesToTranslated(status: Role[] | undefined): string | undefined {
    if (!status) {
      return status;
    }

    return status.map((role: Role) => getTranslatedRole(role) || 'Nieznana rola').join(', ');
  }

  protected readonly Role = Role;
}
