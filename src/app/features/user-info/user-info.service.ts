import { Injectable } from '@angular/core';
import {ListOfUsersService} from "../list-of-users/list-of-users.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private listOfUsersService: ListOfUsersService) { }

  getProfileById(id: string | null) {
    return this.listOfUsersService.getAllProfiles().find(profile => profile.profileId === id);
  }
}
