import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {

  private baseURL = "http://localhost:7116/konto/logowanie";

  constructor(private httpClient: HttpClient) { }

  register(): Observable<void>{
    return this.httpClient.get<void>(`${this.baseURL}`);
  }

}
