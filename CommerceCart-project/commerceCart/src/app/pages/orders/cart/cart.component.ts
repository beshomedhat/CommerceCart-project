import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private _cart:CartService,
    private _order:OrderService,
    private toastr: ToastrService,
    private router:Router,
  ) { }
  cartData=[{
    pCategory: "",
    pImage: "images/default.svg",
    pName: "----",
    pQuantity: 1,
    priceForOne: 1,
    productId: "1",
    totalPrice: 1,
    _id: "1"
  }]
  totalPrice =0

  orderData={
    date: new Date(),
    productIds:[],
    total:0
  }


  saveOrderData(){
    this.orderData.date= new Date()
    this.orderData.total= this.totalPrice

    for(let j=0; j < this.cartData.length ; j++){
      let oneOrderData={
        productId:this.cartData[j].productId,
        pQuantity:this.cartData[j].pQuantity,
        pImage:this.cartData[j].pImage,
        pPrice:this.cartData[j].priceForOne
      }
      this.orderData.productIds.push(oneOrderData)
    }
  }

  getTotalPrice(){
    for(let i=0; i<this.cartData.length; i++)
    {
      this.totalPrice += this.cartData[i].totalPrice
    }
  }
  getCartData(){
    this._cart.getCart().subscribe(data=>{
      if(data.data.length!=0){
        this.cartData = data.data[0].productsData
         this.getTotalPrice()
      }

    })
  }

  delete(id){
    this._cart.removeItemInCart(id).subscribe(data=>{
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('Item deleted from your cart', 'Success!');
      this.getCartData()
    })
  }
  makeOrder(){
    this.saveOrderData()
    this._order.makeOrder(this.orderData).subscribe(data=>{
      console.log(data)
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('your order uploaded', 'Success!');
      this._cart.clearCart().subscribe()
      this.router.navigateByUrl("")
    })
  }
  ngOnInit(): void {
    this.getCartData()
  }

}
