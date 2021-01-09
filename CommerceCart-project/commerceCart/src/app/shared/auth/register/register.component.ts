import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData={
    name:"",
    address:"",
    phone:"",
    email:"",
    pass:""
  }


  constructor(private _user:CustomerService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  ngOnInit(): void {
  }

  register(){
    this._user.register(this.userData).subscribe(data=>{
      localStorage.setItem('token',`Bearer ${data.token}`)
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('loged in', 'Success!');
      this._document.location.reload()

    })
  }

}
