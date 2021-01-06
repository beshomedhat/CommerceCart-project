import { ToastrService } from 'ngx-toastr';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private _user:AdminService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
    ) { }


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
  ngOnInit(): void {
    this.profile()
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
}
