import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

 products=[]
  constructor(
    private _product:ProductService,
    private toastr: ToastrService,
    private router:Router
    ) { }


  getProducts(){
    this._product.getAllProduct().subscribe(data=>{
      this.products=data.data
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  delete(id){
    this._product.delete(id).subscribe(data=>{
      this.toastr.success('product deleted', 'Success!');
      this.getProducts()
    })
  }

}
