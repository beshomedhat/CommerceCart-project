import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _user:AdminService,
    private router:Router,
  ){}

   canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

      if(!localStorage.getItem("token")){
        this.router.navigate(['login'])
        return false
      }
      else {return true;}

  }

}
