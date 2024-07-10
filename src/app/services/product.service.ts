import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "http://localhost:8080"
  constructor(private httpClient: HttpClient) {
     
   }



  
   add(data:any){
    return this.httpClient.post(this.url+"/home/product/add",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

 
  update(data:any){
    return this.httpClient.post(this.url+"/home/product/update",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

   getProducts():Observable<any>{
   
   return this.httpClient.get(this.url+"/home/product/all")
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url+"/home/product/updatestatus",data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  delete(id:any){
    return this.httpClient.post(this.url+"/home/product/delete/"+id, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getProductByCategoryId(id:any){
    return this.httpClient.get(this.url+"/home/product/productsbycategory/"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/home/product/product/"+id);
  }
}
