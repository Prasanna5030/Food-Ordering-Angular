import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url="http://localhost:8080";

  apiUrl= environment.apiUrl;

  dockerUrl:string = 'http://food-ordering-app:8080';


  constructor(private httpClient: HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url+"/home/category/add",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  update(data:any){
    return this.httpClient.post(this.url+"/home/category/update",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getCategories(){
    return this.httpClient.get(this.url+"/home/category/all")
  }

  getFilteredCategories(){
    return this.httpClient.get(this.url+"/home/category/all?filterValue=true");
  }

  getUsers(){
    return this.httpClient.get(this.url+"/home/admin/allusers");
  }

  updateUsers(data:any){
    return this.httpClient.post(this.url+"/home/admin/update",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
