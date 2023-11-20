import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";

import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {ListOfUsersService} from "./list-of-users.service";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'accountStatus', 'add'];

  dataProfiles: MatTableDataSource<Profile>;

  profilesLoaded: Profile[] = [];
  totalGardenCount: number;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private listOfUsersService: ListOfUsersService) {
    this.sortData()
    this.initData();
    this.dataProfiles = new MatTableDataSource(this.profilesLoaded);
    this.updateData()
    this.totalGardenCount = this.listOfUsersService.getTotalProfiles();
    this.dataProfiles.paginator = this.paginator;
  }

  private sortData(){
    this.listOfUsersService.sortProfiles()
  }
  private initData() {
    this.profilesLoaded = this.listOfUsersService.getProfiles(0, this.pageSize);
  }
  fetchData(pageIndex: number, pageSize: number): any[] {
    return this.listOfUsersService.getProfiles(pageIndex, pageSize);
  }

  onNewDataLoaded(data: any[]) {
    this.profilesLoaded = data;
    this.updateData()
  }

  updateData() {
    this.dataProfiles.data = this.profilesLoaded
  }

  navigateToProfileComponent(id: string) {
    this.router.navigate(['/user-info', id]);
  }
}
