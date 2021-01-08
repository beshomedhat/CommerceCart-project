import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productCat=[{category:"electronic"},{category:"accessories"},{category:"kitchen"}]
  constructor(
    private _product:ProductService,
    private router:Router,
  ) { }
// ----------------------electronic data-----------------------------------
  productElecData=
  [
    { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
    { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
    { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
  ]

  getElecData(){
    this._product.getAllProductByCat(this.productCat[0]).subscribe(data=>{
      for(let i=0; i<3; i++){
        if(data.data[i]){
          this.productElecData[i]._id = data.data[i]._id
          this.productElecData[i].name = data.data[i].name
          this.productElecData[i].price = data.data[i].price
          this.productElecData[i].image = data.data[i].image
          this.productElecData[i].category = data.data[i].category
        }
      }
    })
  }
// -----------------------------------------------------------------------

// ----------------------accessories data-----------------------------------
productAccessoriesData=
[
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
]

getAccessoriesData(){
  this._product.getAllProductByCat(this.productCat[1]).subscribe(data=>{
    for(let i=0; i<3; i++){
      if(data.data[i]){
        this.productAccessoriesData[i]._id = data.data[i]._id
        this.productAccessoriesData[i].name = data.data[i].name
        this.productAccessoriesData[i].price = data.data[i].price
        this.productAccessoriesData[i].image = data.data[i].image
        this.productAccessoriesData[i].category = data.data[i].category
      }
    }
  })
}
// --------------------------------------------------------------------------

// ----------------------kitchen data-----------------------------------
productKitchenData=
[
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
  { _id:"", name: "-----", quantity:0, category:"other", price:0, image:"images/default.svg" },
]

getKitchenData(){
  this._product.getAllProductByCat(this.productCat[2]).subscribe(data=>{
    for(let i=0; i<3; i++){
      if(data.data[i]){
        this.productKitchenData[i]._id = data.data[i]._id
        this.productKitchenData[i].name = data.data[i].name
        this.productKitchenData[i].price = data.data[i].price
        this.productKitchenData[i].image = data.data[i].image
        this.productKitchenData[i].category = data.data[i].category
      }
    }
  })
}
// ---------------------------------------------------------
  ngOnInit(): void {
    this.getElecData();
    this.getKitchenData();
    this.getAccessoriesData();
  }


}
