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

  public carts: Cart[] = []
  cartsHaveChild: Cart[] = [];
  public productsObservable: Observable<Cart[]>;
  //public productsObservable2: Observable<Cart[]>;
  //public splice: Cart[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
    this.productsObservable.subscribe((carts: Cart[]) => {
      (this.carts = carts.sort((n1,n2) =>  n1.parent - n2.parent))
      this.cartsHaveChild = this.parentHaveChild(this.carts)
      })
    //this.productsObservable2.subscribe(carts => this.splice = ((carts.sort((n1,n2) => n1.parent.id - n2.parent.id).slice(1,4))));
    this.parentFnLoadPage("false");
    
  }
  
  ngOnInit() {
  }

  parentFnLoadPage($event: string) {	
    console.log("event")	
    console.log($event)

		if($event == "true")    {
    this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts);     
    }

    $event = "false";
  console.log($event)
       /* this.cartService.
      get_carts()
      .subscribe(carts =>this.splice = ((carts.sort((n1,n2) => n1.parent.id - n2.parent.id).slice(1,4))))   */
    }

    parentHaveChild(carts: Cart[])
    {
      if(carts.length <= 1)
      {
        this.cartsHaveChild.push(this.carts[0])
      }
      else{
      for(let i = 0; i<carts.length; i++)
      {
        if(carts[i].childNum > 0){
          this.cartsHaveChild.push(this.carts[i])
        }
      }
     
    }
    console.log(this.cartsHaveChild)
     return this.cartsHaveChild;
    }

    refreshPage()
    {
      this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts); 
    }

}