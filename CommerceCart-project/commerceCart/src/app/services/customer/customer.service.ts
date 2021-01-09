import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  defaultURL ="http://localhost:3000/";
  public loged = false;
  public token = "";
  constructor(private _http:HttpClient) { }

//----------------- register ---------------------------
  register(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}custRegister`,obj)
   }
//----------------- login ---------------------------
  login(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}custLogin`,obj)
   }
//----------------- logout ---------------------------
logout():Observable<any>{
  return this._http.post(`${this.defaultURL}custLogout`,null)
 }
//----------------- logout all ---------------------------
logoutAll():Observable<any>{
  return this._http.post(`${this.defaultURL}custLogoutAll`,null)
 }
//----------------- profile ---------------------------
profile():Observable<any>{
  return this._http.get(`${this.defaultURL}custProfile`)
 }
//----------------- islogged ---------------------------
islogged():Observable<any>{
  return this._http.get(`${this.defaultURL}custIsLogged`)
 }
}
