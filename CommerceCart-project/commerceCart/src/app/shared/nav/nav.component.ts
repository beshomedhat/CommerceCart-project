import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  productCat=[
    "clothes","electronic","food","accessories","furniture","toys","beauty","kitchen","other"
  ]
  userScroll(){
    window.onscroll = function(e){
      if(window.scrollY > 1){
        document.querySelector("nav").classList.add("navScroll")
      }
      else{
        document.querySelector("nav").classList.remove("navScroll")
       }
    }
  }
  ngOnInit(): void {
    this.userScroll();
  }

}
