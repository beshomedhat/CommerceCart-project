import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  defaultURL ="http://localhost:3000/";

  constructor(private _http:HttpClient) { }

  getAllProductByCat(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}allProductCat`,obj)
  }
}
