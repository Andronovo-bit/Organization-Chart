import { Component, OnInit,  } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public carts: Cart[] = [];
  public loadPageBool = false;



  public productsObservable: Observable<Cart[]>;

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
    this.productsObservable.subscribe(carts => this.carts = carts )
  }
  

  ngOnInit() {
  
  }

  setEnable(){
    this.loadPageBool = true;
  }
  
  setDisable(){
    this.loadPageBool = false;
  }

  loadpageCart(){
    this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts);
  }


}