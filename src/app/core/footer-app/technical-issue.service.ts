import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TechnicalIssueService {

  url = '/api/technical-problem/';

  constructor(private httpClient: HttpClient) { }

  // TODO: Implement this method
  sendIssue(title:string,description:string){
    return this.httpClient.post(this.url, {title,description});
  }
}
