import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private _product:ProductService,
    private router:Router,
  ) { }
// ----------------------electronic data-----------------------------------
  productData=
  [
    { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" }
  ]

   productCat = {category:""}

  getElecData(obj){
    this._product.getAllProductByCat(obj).subscribe(data=>{
      if(data.data.length>0){
        this.productData = data.data
      }

    })
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.productCat.category=params['cat']
      this._product.getAllProductByCat(this.productCat).subscribe(data=>{
        if(data.data.length>0){
          this.productData = data.data
        }
        else{
          this.productData=[{ _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" }]
        }
      })
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
