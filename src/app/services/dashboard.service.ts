import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url= "http://localhost:8080";

  apiUrl = environment.apiUrl;

  dockerUrl:string = 'http://food-ordering-app:8080';

  constructor(private httpClient: HttpClient) { }


  getDetails():Observable<any>{
    debugger
    return this.httpClient.get(this.url+"/home/dashboard/details")
  }


  changePassword(data:any){
    debugger
    return this.httpClient.post(this.url+"/home/user/changepassword",data,
    {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
