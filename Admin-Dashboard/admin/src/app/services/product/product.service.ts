import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  defaultURL ="http://localhost:3000/";

  constructor(private _http:HttpClient) { }

  getAllProduct():Observable<any>{
    return this._http.get(`${this.defaultURL}allProducts`)
  }

  addProduct(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}addProduct`,obj)
  }
  getOnProduct(id):Observable<any>{
    return this._http.get(`${this.defaultURL}product/${id}`)
  }
  uploadImg(obj:any,id):Observable<any>{
    return this._http.post(`${this.defaultURL}product/${id}/uploadImg`,obj)
  }
  edit(obj:any,id):Observable<any>{
    return this._http.patch(`${this.defaultURL}product/${id}`,obj)
  }
  delete(id):Observable<any>{
    return this._http.delete(`${this.defaultURL}product/${id}`)
  }
}
