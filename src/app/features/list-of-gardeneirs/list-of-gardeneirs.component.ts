import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Role} from "../register/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {MatPaginator} from "@angular/material/paginator";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Page} from "../../shared/paginator/page.model";
import {MatDialog} from "@angular/material/dialog";
import {UserPaymentsComponent} from "./payments/user-payments.component";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-list-of-gardeneirs',
  templateUrl: './list-of-gardeneirs.component.html',
  styleUrls: ['./list-of-gardeneirs.component.scss']
})
export class ListOfGardeneirsComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'value', 'info'];

  dataProfiles = new MatTableDataSource<Profile>();
  isInEdit = false;

  totalGardeneirsCount: number = 0;
  DefoultpageSize = 10;

  currentPageIndex = 1;
  currentPageSize = this.DefoultpageSize;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private listOfUsersService: ListOfUsersService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.initData();
    this.dataProfiles.paginator = this.paginator;
  }

  private initData() {
    this.loadProfiles(this.currentPageIndex, this.DefoultpageSize)
  }

  loadProfiles(index: number, size: number): void {
    this.spinner.show()
    this.listOfUsersService.getALLGardeinersWithDebt(index, size).subscribe({
      next: (page: Page<Profile>) => {
        this.totalGardeneirsCount = page.count;
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

    this.listOfUsersService.getALLGardeiners(pageIndex, pageSize).subscribe(
      data => {
        this.totalGardeneirsCount = data.count;
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

  selectEditPayments(id: number) {
    this.isInEdit = true
    this.showDetailsDialog(id);
  }


  showDetailsDialog(profileID: number) {
    const dialogRef = this.dialog.open(UserPaymentsComponent, {
      width: '4000px',
      data: {profileID},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateData()
    });
  }

  closeEdit() {
    this.isInEdit = false
  }

  updateData() {
    this.listOfUsersService.getALLGardeiners(this.currentPageIndex, this.currentPageSize).subscribe(
      data => {
        this.totalGardeneirsCount = data.count;
        this.dataProfiles = new MatTableDataSource<Profile>(data.results);
      },
      error => {
        console.error(error);
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      },
      () => {
        this.changeDetectorRef.detectChanges();
        this.closeEdit()
      }
    );
  }

  protected readonly Role = Role;
}
