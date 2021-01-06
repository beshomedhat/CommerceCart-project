import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product-img',
  templateUrl: './add-product-img.component.html',
  styleUrls: ['./add-product-img.component.css']
})
export class AddProductImgComponent implements OnInit {

  image:File;
  private routeSub: Subscription;
  _productId:any
  constructor(
    private route: ActivatedRoute,
    private _user:ProductService,
    private router:Router,
    private toastr: ToastrService,
    ) { }

    ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
        this._productId=params['id']
      });
    }

  uploadImage(e:any){
    this.image = e.target.files[0]
  }

  uploadImg(){

    const myData = new FormData()
    myData.append('upload',this.image,this.image.name)
    this._user.uploadImg(myData,this._productId).subscribe(data=>{
      this.toastr.success('product image uploaded', 'Success!');
      this.router.navigateByUrl('allproducts')
    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
