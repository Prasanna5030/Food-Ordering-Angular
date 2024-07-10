import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
url:string= "http://localhost:8080"


  constructor(private httpClient : HttpClient) { }

  generateReport(data:any){
    return this.httpClient.post(this.url+"/home/bill/generatereport",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }


  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/home/bill/getpdf",data,{responseType:'blob'})
  }

  getBills(){
    return this.httpClient.get(this.url+"/home/bill/getbills");
  }

  delete(id:any){
    return this.httpClient.post(this.url+"/home/bill/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
