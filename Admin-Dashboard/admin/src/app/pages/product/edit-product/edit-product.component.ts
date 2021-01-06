import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private routeSub: Subscription;
  productData={
    name: "",
    quantity:0,
    category:"other",
    price:0
}
_productId:any
productCat=[
  "clothes","electronic","food","accessories","furniture","toys","beauty","kitchen","other"
]
  constructor(
    private route: ActivatedRoute,
    private _product:ProductService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this._productId=params['id']
      this._product.getOnProduct(params['id']).subscribe(data=>{
        this.productData={
          name: data.data.name,
          quantity:data.data.quantity,
          category:data.data.category,
          price:data.data.price
      }
      })
    });
  }

  edit(){
    this._product.edit(this.productData,this._productId).subscribe(data=>{
      this.toastr.success("Product updated","Success!!")
      this.router.navigateByUrl("allproducts")
    })
  }


}
