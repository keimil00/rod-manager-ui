import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private httpClient: HttpClient) { }

  url='api/password-reset/'
  URIRequest='request/'
  URIConfirm='confirm/'

  sendEmail(email:string):Observable<any>{
    const url=this.url+this.URIRequest
    return this.httpClient.post(url,{email})
  }

  resetPassword(token:string,newPassword:string):Observable<any>{
    const url=this.url+this.URIConfirm
    const body={
      token:token,
      password:newPassword
    }
    return this.httpClient.post(url,body)
  }
}
