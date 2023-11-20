import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employer} from "./employer.model";

@Injectable({
  providedIn: 'root'
})
export class GardenInfoService {
  private employers: Employer[] = [
    {
      id: '1',
      position: 'Manager',
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com'
    },
    {
      id: '2',
      position: 'Developer',
      name: 'Jane Smith',
      phoneNumber: '987-654-3210',
      email: 'jane.smith@example.com'
    },
    {
      id: '3',
      position: 'Designer',
      name: 'Mike Johnson',
      phoneNumber: '555-555-5555',
      email: 'mike.johnson@example.com'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }

  getEmployers() {
    return this.employers
  }

  updateEmployer(newEmployer: Employer) {
    for (let i = 0; i < this.employers.length; i++) {
      if (this.employers[i].id === newEmployer.id) {
        this.employers[i] = newEmployer;
        break;
      }
    }
  }

  addEmployer(newEmployer: Employer) {
    this.employers.push(newEmployer)
  }
}
