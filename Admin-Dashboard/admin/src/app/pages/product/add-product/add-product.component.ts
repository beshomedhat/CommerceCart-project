import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DOCUMENT } from '@angular/common';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productData={
    name: "",
    quantity:0,
    category:"other",
    price:0
}
productCat=[
  "clothes","electronic","food","accessories","furniture","toys","beauty","kitchen","other"
]
  constructor(
    private _product:ProductService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  ngOnInit(): void {
  }

  addProduct(){
    this._product.addProduct(this.productData).subscribe(data=>{
    },()=>{
      this.toastr.error('Err msg', 'ERROR!');
    },()=>{
      this.toastr.success('product added', 'Success!');
      this.router.navigateByUrl('allproducts')
    })
  }

}
