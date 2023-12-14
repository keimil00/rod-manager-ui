import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employer} from "./employer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GardenInfoService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly gardenInfoUrl = '/api/garden-info/';
  private readonly employeesURI = 'employees/';
  private readonly descriptionURI = 'description/';

  getEmployers(): Observable<Employer[]> {
    return this.httpClient.get<Employer[]>(this.gardenInfoUrl + this.employeesURI);
  }

  updateEmployer(newEmployer: Employer): Observable<any> {
    const body = {}
    const url = this.gardenInfoUrl + this.employeesURI+"?employee_id="+newEmployer.id
    return this.httpClient.put(url, newEmployer);
  }


  addEmployer(newEmployer: Employer): Observable<any> {
    const url = this.gardenInfoUrl + this.employeesURI
    return this.httpClient.post(url, newEmployer);
  }

  getDescription(): Observable<any> {
    const url = this.gardenInfoUrl + this.descriptionURI
    return this.httpClient.get(url);
  }

  setDescription(description: string): Observable<any> {
    const url = this.gardenInfoUrl + this.descriptionURI
    return this.httpClient.put(url, {description});
  }
}


