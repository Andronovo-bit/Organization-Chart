import { Component,OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  @ViewChild(CartComponent, {static: false}) cart: CartComponent;
  constructor(  ) {
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    console.log(this.cart.carts);
  }

}

