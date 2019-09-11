import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-create-div',
  templateUrl: './create-div.component.html',
  styleUrls: ['./create-div.component.css']
})
export class CreateDivComponent implements OnInit {

 @Input() public parentData;
  
  public childCarts: Cart[] = [];

  private detail = false;
  private deneme = false;
  private parent: Cart;

  public selectedCart: Cart;

  public carts: Cart[] = [];

  public productsObservable: Observable<Cart[]>;

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
    this.productsObservable.subscribe(carts => this.carts = carts)
     
  }

  ngOnInit() {

  }

  cardObj: object = {};


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
    console.log(this.carts)

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