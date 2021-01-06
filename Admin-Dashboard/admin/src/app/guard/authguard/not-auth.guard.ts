import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  isLogged:Boolean
  constructor(
    private _user:AdminService,
    private router:Router,

    ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem("token")){
        this.router.navigate([''])
        return false
      }
    return true;
  }

}
