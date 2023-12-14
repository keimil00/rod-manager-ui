import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../Profile";
import {Page} from "../../shared/paginator/page.model";
import {map, Observable, of} from "rxjs";
import {Role} from "../register/user.model";

@Injectable({
    providedIn: 'root'
})
export class ListOfUsersService {

    private profiles: Profile[] = [
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            phone: '123-456-7890',
            email: 'johndoe@example.com',
            groups: [Role.GARDENER],
            balance: 567,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            phone: '987-654-3210',
            email: 'janesmith@example.com',
            groups: [Role.GARDENER],
            balance: 756,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 3,
            first_name: 'David',
            last_name: 'Johnson',
            phone: '555-555-5555',
            email: 'davidjohnson@example.com',
            groups: [Role.GARDENER],
            balance: 657,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 4,
            first_name: 'Mary',
            last_name: 'Williams',
            phone: '777-777-7777',
            email: 'marywilliams@example.com',
            groups: [Role.GARDENER],
            balance: 675,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 5,
            first_name: 'Robert',
            last_name: 'Brown',
            phone: '111-111-1111',
            email: 'robertbrown@example.com',
            groups: [Role.GARDENER],
            balance: 6765,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 6,
            first_name: 'Linda',
            last_name: 'Jones',
            phone: '222-222-2222',
            email: 'lindajones@example.com',
            groups: [Role.GARDENER],
            balance: 576,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 7,
            first_name: 'Michael',
            last_name: 'Davis',
            phone: '333-333-3333',
            email: 'michaeldavis@example.com',
            groups: [Role.GARDENER],
            balance: 57,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 8,
            first_name: 'Susan',
            last_name: 'Wilson',
            phone: '444-444-4444',
            email: 'susanwilson@example.com',
            groups: [Role.GARDENER],
            balance: 576,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 9,
            first_name: 'William',
            last_name: 'Evans',
            phone: '666-666-6666',
            email: 'williamevans@example.com',
            groups: [Role.GARDENER],
            balance: 6757,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 10,
            first_name: 'Karen',
            last_name: 'Taylor',
            phone: '999-999-9999',
            email: 'karentaylor@example.com',
            groups: [Role.GARDENER],
            balance: 876,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 11,
            first_name: 'Richard',
            last_name: 'Anderson',
            phone: '222-222-2222',
            email: 'richardanderson@example.com',
            groups: [Role.GARDENER],
            balance: 1654,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 12,
            first_name: 'Patricia',
            last_name: 'White',
            phone: '333-333-3333',
            email: 'patriciawhite@example.com',
            groups: [Role.GARDENER],
            balance: 6785,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 13,
            first_name: 'David',
            last_name: 'Thomas',
            phone: '777-777-7777',
            email: 'davidthomas@example.com',
            groups: [Role.GARDENER],
            balance: 456,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 14,
            first_name: 'Susan',
            last_name: 'Jackson',
            phone: '123-123-1234',
            email: 'susanjackson@example.com',
            groups: [Role.GARDENER],
            balance: 8658,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 15,
            first_name: 'Michael',
            last_name: 'Harris',
            phone: '456-456-4567',
            email: 'michaelharris@example.com',
            groups: [Role.GARDENER],
            balance: 654,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 16,
            first_name: 'Karen',
            last_name: 'Martin',
            phone: '111-111-1111',
            email: 'karenmartin@example.com',
            groups: [Role.GARDENER],
            balance: 6546,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 17,
            first_name: 'William',
            last_name: 'Garcia',
            phone: '555-555-5555',
            email: 'williamgarcia@example.com',
            groups: [Role.GARDENER],
            balance: 453,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 18,
            first_name: 'Linda',
            last_name: 'Brown',
            phone: '333-333-3333',
            email: 'lindabrown@example.com',
            groups: [Role.GARDENER],
            balance: 5345,
            paymentDueDate: new Date(2024, 10, 31),
        },
        {
            id: 19,
            first_name: 'Michael',
            last_name: 'Lewis',
            phone: '777-777-7777',
            email: 'michaellewis@example.com',
            groups: [Role.GARDENER],
            balance: 7680,
            paymentDueDate: new Date(2023, 12, 31),
        },
        {
            id: 20,
            first_name: 'Susan',
            last_name: 'Clark',
            phone: '123-123-1234',
            email: 'susanclark@example.com',
            groups: [Role.GARDENER],
            balance: 340,
            paymentDueDate: new Date(2023, 10, 31),
        },
        {
            id: 21,
            first_name: 'John',
            last_name: 'Doe',
            phone: '456-456-4567',
            email: 'johndoe@example.com',
            groups: [],
            balance: 0,
            paymentDueDate: new Date(2023, 9, 15),
        },
        {
            id: 22,
            first_name: 'Alice',
            last_name: 'Johnson',
            phone: '789-789-7890',
            email: 'alicejohnson@example.com',
            groups: [Role.MANAGER],
            balance: 420,
            paymentDueDate: new Date(2023, 8, 28),
        },
        {
            id: 23,
            first_name: 'Bob',
            last_name: 'Smith',
            phone: '234-234-2345',
            email: 'bobsmith@example.com',
            groups: [Role.ADMIN],
            balance: 0,
            paymentDueDate: new Date(2023, 11, 15),
        },
        {
            id: 24,
            first_name: 'Eva',
            last_name: 'Brown',
            phone: '567-567-5678',
            email: 'evabrown@example.com',
            groups: [Role.NON_TECHNICAL_EMPLOYEE],
            balance: 0,
            paymentDueDate: new Date(2023, 7, 22),
        },
        {
            id: 25,
            first_name: 'Michael',
            last_name: 'Miller',
            phone: '890-890-8901',
            email: 'michaelmiller@example.com',
            groups: [],
            balance: 0,
            paymentDueDate: new Date(2023, 6, 10),
        },
        {
            id: 26,
            first_name: 'Sophia',
            last_name: 'Wilson',
            phone: '123-456-7890',
            email: 'sophiawilson@example.com',
            groups: [Role.ADMIN],
            balance: 0,
            paymentDueDate: new Date(2023, 5, 18),
        },
        {
            id: 27,
            first_name: 'David',
            last_name: 'Jones',
            phone: '456-789-0123',
            email: 'davidjones@example.com',
            groups: [Role.MANAGER, Role.TECHNICAL_EMPLOYEE],
            balance: 0,
            paymentDueDate: new Date(2023, 4, 27),
        },
    ];

    gardeneirsAPI ='api/gardeners/'
    constructor(private httpClient: HttpClient) {
    }

    getProfiles2(index: number, size: number): Observable<Page<Profile>> {
        const profilesOnPage = this.profiles.slice((index - 1) * size, (index - 1) * size + size);
        const count = this.profiles.length;
        const page: Page<Profile> = {count, results: profilesOnPage};

        return of(page);
    }

    getProfiles(index: number, size: number): Observable<Page<Profile>> {
        const url = `api/accounts/?page=${index}&page_size=${size}`;
        return this.httpClient.get<Page<Profile>>(url);
    }

    getAllProfiles2(): Observable<Profile[]> {
        return of(this.profiles);
    }
    getAllProfiles(): Observable<Profile[]> {
        const url = `api/accounts/?page=${1}&page_size=${100000}`;
        return this.httpClient.get<Page<Profile>>(url).pipe(
            map((page: Page<Profile>) => page.results)
        );
    }

    getALLGardeiners(index: number, size: number): Observable<Page<Profile>> {
      const url = `${this.gardeneirsAPI}?page=${index}&page_size=${size}`;
      return this.httpClient.get<Page<Profile>>(url);
    }

    getALLGardeinersWithDebt(index: number, size: number): Observable<Page<Profile>> {
        const url = `${this.gardeneirsAPI}?page=${index}&page_size=${size}&payment_arrears=false`;
        return this.httpClient.get<Page<Profile>>(url);
    }

  getALLGardeiners2(index: number, size: number): Observable<Page<Profile>> {
    const gardeneirs = this.profiles.filter((profile) => profile.groups.some((role) => role.includes(Role.GARDENER)));

    const profilesOnPage = gardeneirs.slice((index - 1) * size, (index - 1) * size + size);
    const count = gardeneirs.length;
    const page: Page<Profile> = {count, results: profilesOnPage};
    return of(page);
  }

    sortProfiles() {
        this.profiles.sort((a, b) => {

                const lastNameComparison = a.last_name.localeCompare(b.last_name);
                if (lastNameComparison !== 0) {
                    return lastNameComparison;
                }

                const firstNameComparison = a.first_name.localeCompare(b.first_name);
                if (firstNameComparison !== 0) {
                    return firstNameComparison;
                }

                return a.email.localeCompare(b.email);
            }
        );
    }

    getProfileById(id: number | null): Observable<Profile | undefined> {
        const url = `api/accounts/${id}/`;
        return this.httpClient.get<Profile>(url);
    }

    // editProfile(profile: any): Observable<any>{
    //     const index = this.profiles.findIndex(p => p.id === profile.id);
    //     this.profiles[index] = profile;
    //     return of(null)
    // }
    editProfile(profile: any,id: number | null) {
        const url = `api/accounts/${id}/`;
        console.log(profile);

        return this.httpClient.patch(url, profile);
    }

}

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
//
// ### GET request to retrieve profiles
//
// Retrieves a paginated list of profiles.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/profiles`
// - Query Parameters:
//   - `page`: The page number to retrieve.
// - `size`: The number of profiles per page.
//
// #### Response
//
// The response body contains a paginated list of profiles.
//
//   ```typescript
// interface Profile {
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
//     ADMIN = 'ADMIN',
//     MANAGER = 'MANAGER',
//     GARDENER = 'GARDENER',
//     TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
//     NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
// }
//
// interface Page<T> {
//   count: number;
//   results: T[];
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// ### GET request to fetch all profiles
//
// Retrieves all profiles available in the system.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/all-profiles`
//
// #### Response
//
// The response body contains an array of profiles.
//
//   ```typescript
// interface Profile {
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

