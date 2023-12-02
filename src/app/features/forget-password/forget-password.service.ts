import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private httpClient: HttpClient) { }

  url='reset/'

  sendEmail(email:string):Observable<any>{
    return this.httpClient.post(this.url,email)
  }

  resetPassword(token:string,newPassword:string):Observable<any>{
    const body={
      token:token,
      newPassword:newPassword
    }
    return this.httpClient.post(this.url,body)
  }
}
