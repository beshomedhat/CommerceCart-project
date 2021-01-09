import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private _product:ProductService,
    private _cart:CartService,
    private router:Router,
    private toastr: ToastrService,
    private _user:CustomerService,
    ){ }
  _productId:any
  productData={
    category: "",
    image: "images/default.svg",
    name: "",
    price: 0,
    quantity: -1,
    _id: ""
  }

  cartItem={
    productId:"",
    pName:"",
    pImage:"",
    pCategory:"",
    pQuantity:0,
    priceForOne:0,
    totalPrice:0
  }

  cartForm = new FormGroup({
    prodQuantity: new FormControl(1)
  })

  loged: Boolean
  isLoged(){
    this._user.islogged().subscribe(data=>{
      if(data.data){
        this.loged=true
      }
      else{this.loged=false}
    })
  }

  ngOnInit() {
    this.isLoged()
    this.routeSub = this.route.params.subscribe(params => {
      this._productId=params['id']
      this._product.getOnProduct(params['id']).subscribe(data=>{
        this.productData=data.data
        this.cartForm = new FormGroup({
          prodQuantity: new FormControl(1,[
            Validators.min(1),
            Validators.max(data.data.quantity),
            Validators.required],
            )
        });
      })
    });
  }

  getOrderData(){
    this.cartItem={
      productId:this.productData._id,
      pName:this.productData.name,
      pImage:this.productData.image,
      pCategory:this.productData.category,
      pQuantity:this.cartForm.value.prodQuantity,
      priceForOne:this.productData.price,
      totalPrice:this.cartForm.value.prodQuantity * this.productData.price
    }
    this._cart.addToCart(this.cartItem).subscribe(data=>{
      console.log(data)
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('Item added in your cart', 'Success!');

    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
