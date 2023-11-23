import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TechnicalIssueService {

  constructor(private httpClient: HttpClient) { }

  // TODO: Implement this method
  sendIssue(title:string,description:string){}
}
