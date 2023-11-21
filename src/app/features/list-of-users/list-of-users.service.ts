import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GardenPlotBackend} from "../list-of-garden-plot/garden-plot";
import {Profile, Role_TEMP} from "../Profile";
import {Page} from "../../shared/paginator/page.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListOfUsersService {

  private profiles: Profile[] = [
    {
      profileId: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      email: 'johndoe@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 567,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '987-654-3210',
      email: 'janesmith@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 756,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '3',
      firstName: 'David',
      lastName: 'Johnson',
      phoneNumber: '555-555-5555',
      email: 'davidjohnson@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 657,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '4',
      firstName: 'Mary',
      lastName: 'Williams',
      phoneNumber: '777-777-7777',
      email: 'marywilliams@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 675,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '5',
      firstName: 'Robert',
      lastName: 'Brown',
      phoneNumber: '111-111-1111',
      email: 'robertbrown@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 6765,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '6',
      firstName: 'Linda',
      lastName: 'Jones',
      phoneNumber: '222-222-2222',
      email: 'lindajones@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 576,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '7',
      firstName: 'Michael',
      lastName: 'Davis',
      phoneNumber: '333-333-3333',
      email: 'michaeldavis@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 57,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '8',
      firstName: 'Susan',
      lastName: 'Wilson',
      phoneNumber: '444-444-4444',
      email: 'susanwilson@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 576,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '9',
      firstName: 'William',
      lastName: 'Evans',
      phoneNumber: '666-666-6666',
      email: 'williamevans@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 6757,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '10',
      firstName: 'Karen',
      lastName: 'Taylor',
      phoneNumber: '999-999-9999',
      email: 'karentaylor@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 876,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '11',
      firstName: 'Richard',
      lastName: 'Anderson',
      phoneNumber: '222-222-2222',
      email: 'richardanderson@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 1654,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '12',
      firstName: 'Patricia',
      lastName: 'White',
      phoneNumber: '333-333-3333',
      email: 'patriciawhite@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 6785,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '13',
      firstName: 'David',
      lastName: 'Thomas',
      phoneNumber: '777-777-7777',
      email: 'davidthomas@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 456,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '14',
      firstName: 'Susan',
      lastName: 'Jackson',
      phoneNumber: '123-123-1234',
      email: 'susanjackson@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 8658,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '15',
      firstName: 'Michael',
      lastName: 'Harris',
      phoneNumber: '456-456-4567',
      email: 'michaelharris@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 654,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '16',
      firstName: 'Karen',
      lastName: 'Martin',
      phoneNumber: '111-111-1111',
      email: 'karenmartin@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 6546,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '17',
      firstName: 'William',
      lastName: 'Garcia',
      phoneNumber: '555-555-5555',
      email: 'williamgarcia@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 453,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '18',
      firstName: 'Linda',
      lastName: 'Brown',
      phoneNumber: '333-333-3333',
      email: 'lindabrown@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 5345,
      paymentDueDate: new Date(2024, 10, 31),
    },
    {
      profileId: '19',
      firstName: 'Michael',
      lastName: 'Lewis',
      phoneNumber: '777-777-7777',
      email: 'michaellewis@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 7680,
      paymentDueDate: new Date(2023, 12, 31),
    },
    {
      profileId: '20',
      firstName: 'Susan',
      lastName: 'Clark',
      phoneNumber: '123-123-1234',
      email: 'susanclark@example.com',
      accountStatus: [Role_TEMP.GARDENER],
      paymentAmount: 340,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      profileId: '21',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '456-456-4567',
      email: 'johndoe@example.com',
      accountStatus: [Role_TEMP.USER],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 9, 15),
    },
    {
      profileId: '22',
      firstName: 'Alice',
      lastName: 'Johnson',
      phoneNumber: '789-789-7890',
      email: 'alicejohnson@example.com',
      accountStatus: [Role_TEMP.MANAGER],
      paymentAmount: 420,
      paymentDueDate: new Date(2023, 8, 28),
    },
    {
      profileId: '23',
      firstName: 'Bob',
      lastName: 'Smith',
      phoneNumber: '234-234-2345',
      email: 'bobsmith@example.com',
      accountStatus: [Role_TEMP.ADMIN],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 11, 15),
    },
    {
      profileId: '24',
      firstName: 'Eva',
      lastName: 'Brown',
      phoneNumber: '567-567-5678',
      email: 'evabrown@example.com',
      accountStatus: [Role_TEMP.EMPLOYEE],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 7, 22),
    },
    {
      profileId: '25',
      firstName: 'Michael',
      lastName: 'Miller',
      phoneNumber: '890-890-8901',
      email: 'michaelmiller@example.com',
      accountStatus: [Role_TEMP.USER],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 6, 10),
    },
    {
      profileId: '26',
      firstName: 'Sophia',
      lastName: 'Wilson',
      phoneNumber: '123-456-7890',
      email: 'sophiawilson@example.com',
      accountStatus: [Role_TEMP.ADMIN],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 5, 18),
    },
    {
      profileId: '27',
      firstName: 'David',
      lastName: 'Jones',
      phoneNumber: '456-789-0123',
      email: 'davidjones@example.com',
      accountStatus: [Role_TEMP.MANAGER, Role_TEMP.EMPLOYEE],
      paymentAmount: null,
      paymentDueDate: new Date(2023, 4, 27),
    },
  ];

  constructor(private httpClient: HttpClient) { }

  getProfiles(index: number, size: number): Observable<Page<Profile>> {
    const profilesOnPage = this.profiles.slice((index-1) * size, (index-1) * size + size);
    const count = this.profiles.length;
    const page: Page<Profile> = { count, results: profilesOnPage };

    return of(page);
  }

  // TODO endPoint
  getProfiles2(index: number, size: number): Observable<Page<Profile>> {
    const url = `https://localhost:1337/api/profiles?page=${index}&size=${size}`;
    return this.httpClient.get<Page<Profile>>(url);
  }

  getAllProfiles() : Profile[]{
    return this.profiles
  }

  // TODO endPoint
  getAllProfiles2(): Observable<Profile[]> {
    const url = 'https://localhost:1337/api/all-profiles';
    return this.httpClient.get<Profile[]>(url);
  }


  sortProfiles(){
    this.profiles.sort((a, b) => {

        const lastNameComparison = a.lastName.localeCompare(b.lastName);
        if (lastNameComparison !== 0) {
          return lastNameComparison;
        }

        const firstNameComparison = a.firstName.localeCompare(b.firstName);
        if (firstNameComparison !== 0) {
          return firstNameComparison;
        }

        return a.email.localeCompare(b.email);
      }
    );
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
//   accountStatus: Role_TEMP[];
//   paymentAmount: number | null;
//   paymentDueDate: Date;
// }
//
// export enum Role_TEMP {
//   USER = 'UŻYTKOWNIK',
//   ADMIN = 'ADMINISTRATOR',
//   MANAGER = 'Zarządca ogrodu',
//   GARDENER = 'Działkowiec',
//   EMPLOYEE = 'PRACOWNIK',
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
//   accountStatus: Role_TEMP[];
//   paymentAmount: number | null;
//   paymentDueDate: Date;
// }
//
// export enum Role_TEMP {
//   USER = 'UŻYTKOWNIK',
//   ADMIN = 'ADMINISTRATOR',
//   MANAGER = 'Zarządca ogrodu',
//   GARDENER = 'Działkowiec',
//   EMPLOYEE = 'PRACOWNIK',
// }

