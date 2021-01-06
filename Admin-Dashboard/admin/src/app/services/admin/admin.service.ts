import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  defaultURL ="http://localhost:3000/";
  public loged = false;
  public token = "";
  constructor(private _http:HttpClient) { }

//----------------- register ---------------------------
  register(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}registerAdmin`,obj)
   }
//----------------- login ---------------------------
  login(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}adminLogin`,obj)
   }
//----------------- logout ---------------------------
logout():Observable<any>{
  return this._http.post(`${this.defaultURL}adminLogout`,null)
 }
//----------------- logout all ---------------------------
logoutAll():Observable<any>{
  return this._http.post(`${this.defaultURL}adminLogoutAll`,null)
 }
//----------------- profile ---------------------------
profile():Observable<any>{
  return this._http.get(`${this.defaultURL}adminProfile`)
 }
//----------------- islogged ---------------------------
islogged():Observable<any>{
  return this._http.get(`${this.defaultURL}islogged`)
 }

}

