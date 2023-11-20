import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {profiles} from "./ProfilesService";
import {GardenPlotBackend} from "../list-of-garden-plot/garden-plot";
import {Profile} from "../Profile";

@Injectable({
  providedIn: 'root'
})
export class ListOfUsersService {

  constructor(private httpClient: HttpClient) { }

  getTotalProfiles(): number {
    return profiles.length;
  }

  getProfiles(index: number, size: number): Profile[] {
    return profiles.slice(index * size, index * size + size);
  }
}
