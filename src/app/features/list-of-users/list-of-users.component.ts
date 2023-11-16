import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";

import {Router} from "@angular/router";
import {profiles} from "./ProfilesService";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'accountStatus', 'add'];

  dataProfiles: MatTableDataSource<Profile>;

  constructor(private router: Router) {
    this.dataProfiles = new MatTableDataSource(profiles);
    profiles.sort((a, b) => {

      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }

      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      }

      return a.email.localeCompare(b.email);
    });
  }
  navigateToProfileComponent(id: string) {
    this.router.navigate(['/user-info', id]);
  }
}
