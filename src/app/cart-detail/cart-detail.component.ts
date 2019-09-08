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

  message: boolean;
  cartDetail: Cart;

  constructor(private cart: CartService) { }

  ngOnInit() {
    this.cart.currentMessage.subscribe(message => this.message = message)
    this.cart.currentCart.subscribe(cartDetails => this.cartDetail = cartDetails)
  }

  
 closeDetails(){
    this.message = false;
  }


}