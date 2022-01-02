import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }
   URI  = environment.apiUrl

  addEmp = (data: any) => {
    console.log(data)
   return  this.http.post(`${this.URI}/addemployee`, data)
  }
  listEmp = () => {
    return  this.http.get(`${this.URI}`)
  }
}
