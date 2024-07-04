import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from 'module';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient!:HttpClient

  getToken(){
    return localStorage.getItem('token');
  }

  appUrl:string= "http://localhost:8080";
  // url= environment.apiUrl;
  constructor( private router : Router, private ngxUiLoader :NgxUiLoaderService ,private handler:HttpBackend) { 
   this.httpClient=new HttpClient(handler);
  }

  signup(data:any){
    return this.httpClient.post(this.appUrl+"/api/auth/register",data, 
      { headers: new HttpHeaders().set('Content-Type','application/json')} )
      .pipe(
      catchError(error => {
        if (error.status !== 200) {
          this.ngxUiLoader.stop();
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }


  login(data:any){
    return this.httpClient.post(this.appUrl+"/api/auth/authenticate", data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    }).pipe(
      catchError(error => {
        if (error.status !== 200) {
          console.log("error while login")
          this.ngxUiLoader.stop();
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.appUrl+"/api/auth/forgotpassword", data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
     }).pipe(
      catchError(error => {
        if (error.status !== 200) {
          this.ngxUiLoader.stop();
          console.log("error while signup")
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }


  checkToken(){
    return this.httpClient.get(this.appUrl+"/api/auth/checktoken")
  }
}
