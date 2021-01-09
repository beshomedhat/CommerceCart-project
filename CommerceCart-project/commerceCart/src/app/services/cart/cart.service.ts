import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  defaultURL ="http://localhost:3000/";

  constructor(private _http:HttpClient) { }

//------------add item in cart--------------------------
  addToCart(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}cart`,obj)
  }
//-------------------get customer cart--------------------------
  getCart():Observable<any>{
    return this._http.post(`${this.defaultURL}custCart`,null)
  }
//-------------------clear customer cart--------------------------
  clearCart():Observable<any>{
    return this._http.post(`${this.defaultURL}clearCart`,null)
  }

//-------------------remove item from cart--------------------------
  removeItemInCart(id):Observable<any>{
    return this._http.post(`${this.defaultURL}cart/${id}`,null)
  }

}
