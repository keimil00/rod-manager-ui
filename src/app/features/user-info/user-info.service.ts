import {Injectable} from '@angular/core';
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Profile} from "../Profile";
import {Observable, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    private readonly myIdUrl = 'https://localhost:1337/api/myID';

    constructor(private listOfUsersService: ListOfUsersService, private httpClient: HttpClient) {
    }



}

// ### GET request to retrieve Current User ID
//
// Retrieves the current user's ID.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/myID`
//
// #### Response
//
// The response body contains the current user's ID.
//
// This endpoint retrieves the current user's ID.

