import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  appUrl= "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }


  getDetails():Observable<any>{
    debugger
    return this.httpClient.get(this.appUrl+"/home/dashboard/details")
  }


  changePassword(data:any){
    debugger
    return this.httpClient.post(this.appUrl+"/home/user/changepassword",data,
    {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
