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
  public productsObservable: Observable<Cart[]>;
  public sclice: Cart[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
    this.productsObservable.subscribe(carts => this.carts = carts.sort((n1,n2) => n1.parent.id - n2.parent.id));
    this.parentFnLoadPage("false");
    
  }
  
  ngOnInit() {
  }

  parentFnLoadPage($event: string) {		
    console.log($event)

		if($event == "true")    {
    this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts.sort((n1,n2) => n1.parent.id - n2.parent.id));     
    }
    $event = "false";
        this.cartService.
      get_carts()
      .subscribe(carts =>this.sclice = ((carts.sort((n1,n2) => n1.parent.id - n2.parent.id).slice(1,4))))   
    }

}