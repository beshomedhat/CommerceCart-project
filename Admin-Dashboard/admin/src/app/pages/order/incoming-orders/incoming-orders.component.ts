import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit {

  orders=[]

  status="ordered"
  constructor(
    private _order:OrderService,
    private toastr: ToastrService,
    private router:Router
    ) { }

    acceptOrder(id){
      const orderStatus = {status:"accepted"}
      this._order.edit(orderStatus,id).subscribe(data=>{
        this.toastr.success('order accepted', 'Success!');
      this.getData()
      })
    }

    rejectOrder(id){
      const orderStatus = {status:"rejected"}
      this._order.edit(orderStatus,id).subscribe(data=>{
        this.toastr.success('order rejected', 'Success!');
      this.getData()
      })
    }

  getData(){
    const orderStatus = {status:this.status}
    this._order.getAllOrdersCat(orderStatus).subscribe(data=>{
      this.orders=data.data
    })
  }
  ngOnInit(): void {
    this. getData()
  }
  delete(id){
    this._order.delete(id).subscribe(data=>{
      this.toastr.success('order deleted', 'Success!');
      this.getData()
    })
  }

}
