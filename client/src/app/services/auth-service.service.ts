import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  http = inject(HttpClient)

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj : any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  resetEmailService(emailObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, emailObj);
  }

  resetPasswordService(pwdObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, pwdObj);
  }

  successEmailService(emailObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}success-email`, emailObj);
  }

  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }

}
