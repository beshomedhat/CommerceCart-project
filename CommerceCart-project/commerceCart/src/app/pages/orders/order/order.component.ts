import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cartData=[{
    pCategory: "",
    pImage: "images/default.svg",
    pName: "----",
    pQuantity: 1,
    pPrice: 1,
    productId: "1",
    totalPrice: 1,
    _id: "1"
  }]
  totalPrice=0
  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private _order:OrderService,

  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this._order.getOneOrder(params['id']).subscribe(data=>{
        this.totalPrice=data.data.total
        this.cartData=data.data.productIds
        console.log(data.data.productIds)
      })
    })

  }

}
