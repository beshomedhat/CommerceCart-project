import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private _product:ProductService,
    private toastr: ToastrService,
    private router:Router,
    ) { }
  _productId:any
  productData={
    category: "",
    image: "images/default.svg",
    name: "",
    price: 0,
    quantity: 0,
    _id: ""
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this._productId=params['id']
      this._product.getOnProduct(params['id']).subscribe(data=>{
        this.productData=data.data
      })
    });
  }


  delete(id){
    this._product.delete(id).subscribe(data=>{
      this.toastr.success('product deleted', 'Success!');
      this.router.navigateByUrl('allproducts')
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
