import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {getTranslatedRole, Role} from "../register/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Page} from "../../shared/paginator/page.model";

@Component({
  selector: 'app-list-of-gardeneirs',
  templateUrl: './list-of-gardeneirs.component.html',
  styleUrls: ['./list-of-gardeneirs.component.scss']
})
export class ListOfGardeneirsComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'accountStatus', 'edit'];

  dataProfiles = new MatTableDataSource<Profile>();

  profilesLoaded: Profile[] = [];
  totalUsersCount: number = 0;
  DefoultpageSize = 10;

  currentPageIndex = 1;
  currentPageSize = this.DefoultpageSize;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private listOfUsersService: ListOfUsersService, private changeDetectorRef: ChangeDetectorRef) {
    this.initData();
    this.dataProfiles.paginator = this.paginator;
  }

  private initData() {
    this.loadProfiles(this.currentPageIndex, this.DefoultpageSize)
  }

  loadProfiles(index: number, size: number): void {
    this.listOfUsersService.getProfiles(index, size).subscribe((page: Page<Profile>) => {
      this.totalUsersCount = page.count;
      this.dataProfiles = new MatTableDataSource<Profile>(page.results);
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
      },
      () => {
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  navigateToProfileComponent(id: string) {
  }


  protected readonly Role = Role;
}
