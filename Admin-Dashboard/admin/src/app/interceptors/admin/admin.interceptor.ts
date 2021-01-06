import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem('token')
    if(token){
      request = request.clone({
        headers: request.headers.set('Auth', token)
      })
    }
    return next.handle(request);
  }
}
