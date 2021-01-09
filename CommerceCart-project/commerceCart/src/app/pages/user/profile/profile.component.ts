import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _user:CustomerService,
    private _order:OrderService
  ) { }

  userData={
    name:"",
    address:"",
    phone:"",
    email:"",
    pass:""
  }
  orders=[]
  getallOrders(){
    this._order.getOrders().subscribe(data=>{
      this.orders=data.data
    })
  }
  ngOnInit(): void {
    this._user.profile().subscribe(data=>{
      this.userData=data.data
    })
    this.getallOrders()
  }

}
