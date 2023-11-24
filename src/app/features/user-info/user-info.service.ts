import {Injectable} from '@angular/core';
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Profile} from "../Profile";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private readonly profilesUrl = 'https://localhost:1337/api/profiles';
    private readonly myIdUrl = 'https://localhost:1337/api/myID';

    constructor(private listOfUsersService: ListOfUsersService, private httpClient: HttpClient) {
    }

    // @ts-ignore
    profiles: Profile[];

    getProfileById(id: number | null): Profile | undefined {
        this.initProfiles()
        return this.profiles.find(profile => profile.profileId === id);
    }

    initProfiles() {
        this.listOfUsersService.getAllProfiles().subscribe((profiles: Profile[]) => {
            this.profiles = profiles;
        });
    }

    getProfileById2(id: string | null): Observable<Profile> {
        const url = `${this.profilesUrl}/${id}`;
        return this.httpClient.get<Profile>(url);
    }

    getProfileID(): Observable<string> {
        const url = this.myIdUrl;
        return this.httpClient.get<string>(url);
    }

}


// ### GET request to retrieve Profile by ID
//
// Retrieves user profile information based on the provided profile ID.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/profiles/:id`
//
// #### Response
//
// The response body contains details of the user profile.
//
//   ```typescript
// export interface Profile {
//   profileId: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   accountStatus: Role[];
//   paymentAmount: number | null;
//   paymentDueDate: Date;
// }
//
// export enum Role {
//   ADMIN = 'ADMIN',
//   MANAGER = 'Zarządca',
//   GARDENER = 'Działkowicz',
//   TECHNICAL_EMPLOYEE = 'pracownik_techniczny',
//   NON_TECHNICAL_EMPLOYEE = 'pracownik_nie_techniczny',
// }
// .
// .
// .
// .
// .
// .
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

