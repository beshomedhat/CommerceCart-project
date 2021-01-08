import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-one-order',
  templateUrl: './one-order.component.html',
  styleUrls: ['./one-order.component.css']
})
export class OneOrderComponent implements OnInit {

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private _order:OrderService,
    private toastr: ToastrService,
    private router:Router,
    ) { }
  _orderId:any

  orderData={
    _id:"",
    date:"",
    status:"",
    customerId:"",
    productIds:[{
        productId:"",
        pQuantity:""
    }],
    total:""
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this._orderId=params['id']
      this._order.getOneOrder(params['id']).subscribe(data=>{
        this.orderData=data.data
        console.log(data.data)
      })
    });
  }


  acceptOrder(id){
    const orderStatus = {status:"accepted"}
    this._order.edit(orderStatus,id).subscribe(data=>{
      this.toastr.success('order accepted', 'Success!');
      this.router.navigateByUrl('incomingOrders')
    })
  }

  rejectOrder(id){
    const orderStatus = {status:"rejected"}
    this._order.edit(orderStatus,id).subscribe(data=>{
      this.toastr.success('order rejected', 'Success!');
      this.router.navigateByUrl('incomingOrders')
    })
  }

  delete(id){
    this._order.delete(id).subscribe(data=>{
      this.toastr.success('order deleted', 'Success!');
      this.router.navigateByUrl('incomingOrders')
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
