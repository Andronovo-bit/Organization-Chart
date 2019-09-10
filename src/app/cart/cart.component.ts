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

  public childCarts: Cart[] = [];

  private detail = false;

  private parent: Cart;

  public selectedCart: Cart;

  public productsObservable: Observable<Cart[]>;

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
  }

  cardObj: object = {};

  ngOnInit() {
    this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts);
  }

  get_Cart(id: number): Cart {
    return this.carts.find(i => i.id == id)
  }

  get_Pcarts(id: number): Cart {
    return this.carts.find(i => i.id == id)
  }

  createNewCard() {
    
    this.cardObj = {
      "name": "",
      "pos": "",
      "email": "",
      "img": "",
      "startedAt": "",
      "bio": "",
      "parent": this.parent

    }
    this.http.post("https://5d72531d5acf5e0014730cb8.mockapi.io/api/ocv/1/cart/", this.cardObj).subscribe((res: Response) => {
      this.loadPage();
    })
  }
  
  delete_Cart(id: number){
    this.cartService.deleteCart(id).subscribe((res: Response)=>{
      this.loadPage();
    })
  }


  get_Detail(newCart: Cart) {
    this.detail = true;
    this.selectedCart = newCart;
    this.cartService.changeMessage(this.detail, this.selectedCart);

  }

  loadPage(){
    this.cartService.
      get_carts()
      .subscribe(carts => this.carts = carts);
  }

  getParent(parent: Cart){
    this.parent = parent;
   // console.log(this.parent);
  }

  getChildren(parent: Cart){
    this.getParent(parent);
    this.childCarts.push(this.get_Pcarts(parent.id))
    return this.childCarts;
    console.log(this.childCarts)
   /* console.log(this.get_Cart(id));
    this.childCarts = this.get_Cart(id)
    console.log(this.childCarts);
    return this.childCarts;*/
  }

}