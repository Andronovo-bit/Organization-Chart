import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.model';
import {Observable} from 'rxjs';
import { CartService } from '../cart.service'

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  message: boolean = false;
  cartDetail: Cart; 
  carts: Cart[] = [];

  fullName: string;
  pos: string;
  email: string;
  img: string;
  startedAt: string;
  Bio: string;

  constructor(private cart: CartService) { }

  ngOnInit() {
    this.cart.currentMessage.subscribe((message) => {
    if(message == true){this.isEnable()}})
    this.cart.currentCart.subscribe(cartDetails => this.cartDetail = cartDetails)
  }

  isEnable(){
    this.message = true;
      if(this.message == true){
      this.fullName = this.cartDetail.name;
      this.pos = this.cartDetail.pos;
      this.email = this.cartDetail.email;
      this.img = this.cartDetail.img;
      this.startedAt = this.cartDetail.startedAt;
      this.Bio = this.cartDetail.bio;
      
    }
  }

    loadPage(){
    this.cart.
      get_carts()
      .subscribe(carts => this.carts = carts);
  }

  
 closeDetails(){
    this.message = false;
  }

  onSubmit(){
    this.cartDetail.name = this.fullName;
    this.cartDetail.pos = this.pos;
    this.cartDetail.email = this.email;
    this.cartDetail.img = this.img;
    this.cartDetail.startedAt = this.startedAt;
    this.cartDetail.bio = this.Bio;
  }

  update_Cart(cart: Cart){
    this.onSubmit();
    this.cart.updateCart(this.cartDetail).subscribe((res) =>
    {
      this.loadPage();
    })
  }


}