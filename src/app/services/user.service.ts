import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from 'module';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Injectable({
  providedIn: 'root'
})
export class UserService {



  appUrl:string= "http://localhost:8080";
  // url= environment.apiUrl;
  constructor(private httpClient: HttpClient, private router : Router, private ngxUiLoader :NgxUiLoaderService) { }

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
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }
}
