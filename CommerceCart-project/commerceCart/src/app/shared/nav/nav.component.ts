import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private _user:CustomerService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  productCat=[
    "clothes","electronic","food","accessories","furniture","toys","beauty","kitchen","other"
  ]
  userScroll(){
    window.onscroll = function(e){
      if(window.scrollY > 1){
        document.querySelector("nav").classList.add("navScroll")
      }
      else{
        document.querySelector("nav").classList.remove("navScroll")
       }
    }
  }

  getCatData(){
    // this._document.location.reload()
  }

  adminData = {
    email: String,
    name: String
  }
  loged: Boolean
  profile(){
    this._user.islogged().subscribe(data=>{
      if(data.data){
        this._user.profile().subscribe(data=>{
          this.adminData.email = data.data.email;
          this.adminData.name = data.data.name;
          this.loged=true
        })
      }
      else{this.loged=false}
    })
  }
  logout(){
    this._user.logout().subscribe(data=>{
      localStorage.removeItem('token')
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('loged out', 'Success!');
      this._document.location.reload()
    })
  }
  logoutAll(){
    this._user.logoutAll().subscribe(data=>{
      localStorage.removeItem('token')
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('loged out', 'Success!');
      this._document.location.reload()
    })
  }
  ngOnInit(): void {
    this.userScroll();
    this.profile()
  }

}
