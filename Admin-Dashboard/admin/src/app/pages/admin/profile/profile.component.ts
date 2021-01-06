import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _user:AdminService) { }

  userData={
    name:"",
    email:""
  }
  ngOnInit(): void {
    this._user.profile().subscribe(data=>{
      this.userData.email=data.data.email
      this.userData.name=data.data.name
    })
  }



}
