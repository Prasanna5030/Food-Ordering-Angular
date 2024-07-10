import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  appUrl="http://localhost:8080"
  constructor(private httpClient: HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.appUrl+"/home/category/add",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  update(data:any){
    return this.httpClient.post(this.appUrl+"/home/category/update",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getCategories(){
    return this.httpClient.get(this.appUrl+"/home/category/all")
  }

  getFilteredCategories(){
    return this.httpClient.get(this.appUrl+"/home/category/all?filterValue=true");
  }

  getUsers(){
    return this.httpClient.get(this.appUrl+"/home/admin/allusers");
  }

  updateUsers(data:any){
    return this.httpClient.post(this.appUrl+"/home/admin/update",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
