import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData={
    email:"",
    pass:""
  }
  constructor(private _user:AdminService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  ngOnInit(): void {
  }

  login(){
    this._user.login(this.userData).subscribe(data=>{
      localStorage.setItem('token',`Bearer ${data.token}`)
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('loged in', 'Success!');
      this._document.location.reload()

    })
  }

}
