import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  defaultURL ="http://localhost:3000/";

  constructor(private _http:HttpClient) { }

//------------make order--------------------------
  makeOrder(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}makeOrder`,obj)
  }
//-------------------get customer orders--------------------------
  getOrders():Observable<any>{
    return this._http.get(`${this.defaultURL}allCustOrders`)
  }
//-------------------get one order--------------------------
  getOneOrder(id):Observable<any>{
    return this._http.get(`${this.defaultURL}order/${id}`)
  }
}
