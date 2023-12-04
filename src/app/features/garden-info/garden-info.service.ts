import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employer} from "./employer.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GardenInfoService {
  private employers: Employer[] = [
    {
      id: 1,
      position: 'Manager',
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      position: 'Developer',
      name: 'Jane Smith',
      phoneNumber: '987-654-3210',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      position: 'Designer',
      name: 'Mike Johnson',
      phoneNumber: '555-555-5555',
      email: 'mike.johnson@example.com'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }

  private readonly employersUrl = '/api/garden-info/';

  getEmployers2() :Observable<Employer[]> {
    return of( this.employers)
  }

  // TODO
  getEmployers(): Observable<Employer[]> {
    return this.httpClient.get<Employer[]>(this.employersUrl);
  }

  // updateEmployer(newEmployer: Employer, id: number) {
  //   for (let i = 0; i < this.employers.length; i++) {
  //     if (this.employers[i].id === id) {
  //       this.employers[i] = newEmployer;
  //       break;
  //     }
  //   }
  // }

  updateEmployer(newEmployer: Employer, id: number): Observable<any> {
    const url = `${this.employersUrl}/${id}/`;
    return this.httpClient.put(url, newEmployer);
  }

  // addEmployer(newEmployer: Employer) {
  //   this.employers.push(newEmployer)
  // }

  addEmployer(newEmployer: Employer): Observable<any> {
    return this.httpClient.post(this.employersUrl, newEmployer);
  }

  getDescription(): Observable<any> {
    return this.httpClient.get(this.employersUrl + 'description/');
  }

  setDescription(description: string): Observable<any> {
    return this.httpClient.put(this.employersUrl + 'description/', {description});
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
// ### GET request to retrieve Employers
//
// Retrieves a list of employers.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/employers`
//
// #### Response
//
// The response body contains an array of employer objects.
//
//   ```typescript
// export interface Employer {
//   id: string;
//   position: string;
//   name: string;
//   phoneNumber: string;
//   email: string;
// }
// Example response
// [
//   {
//     "id": "1",
//     "position": "Manager",
//     "name": "John Doe",
//     "phoneNumber": "123-456-7890",
//     "email": "john.doe@example.com"
//   },
//   {
//     "id": "2",
//     "position": "Developer",
//     "name": "Jane Smith",
//     "phoneNumber": "987-654-3210",
//     "email": "jane.smith@example.com"
//   },
//   {
//     "id": "3",
//     "position": "Designer",
//     "name": "Mike Johnson",
//     "phoneNumber": "555-555-5555",
//     "email": "mike.johnson@example.com"
//   }
// ]
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
// ### PUT request to update an Employer
//
// Updates details of a specific employer.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/employers/:id`
//
// #### Request Body
//
// The request body should contain updated employer information.
//
//   ```typescript
// export interface Employer {
//   id: string;
//   position: string;
//   name: string;
//   phoneNumber: string;
//   email: string;
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
// ### POST request to add a new Employer
//
// Adds a new employer to the list of employers.
//
// #### Endpoint
//
// - Method: `POST`
// - URL: `https://localhost:1337/api/employers`
//
// #### Request Body
//
// The request body should contain information about the new employer to be added.
//
//   ```typescript
// export interface Employer {
//   id: string;
//   position: string;
//   name: string;
//   phoneNumber: string;
//   email: string;
// }

