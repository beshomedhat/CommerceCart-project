import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  defaultURL ="http://localhost:3000/";
  constructor(private _http:HttpClient) { }


  getAllOrders():Observable<any>{
    return this._http.get(`${this.defaultURL}allOrders`)
  }

  getAllOrdersCat(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}allOrdersCat`,obj)
  }

  getOneOrder(id):Observable<any>{
    return this._http.get(`${this.defaultURL}orderAdmin/${id}`)
  }

  edit(obj:any,id):Observable<any>{
    return this._http.patch(`${this.defaultURL}editOrder/${id}`,obj)
  }

  delete(id):Observable<any>{
    return this._http.delete(`${this.defaultURL}deleteOrder/${id}`)
  }

}
