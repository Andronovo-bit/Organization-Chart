import { Component, OnInit, Input, EventEmitter, Output   } from '@angular/core';
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
  
  //public childCarts: Cart[] = [];

  private detail = false;
  private parent: Cart;
  private objCart: Cart;
  private child: Cart[] = [];
  public selectedCart: Cart;
  public carts: Cart[] = [];
  public productsObservable: Observable<Cart[]>;
  private  cardObj: object = {};
  private incChildNum: object = {};
  private parentNumSum: number[] = [null,1,2,3,4,5]
  private parentSum: number[] = [];
  //cardObj3: object = {};


  @Output() trigger: EventEmitter<string> = new EventEmitter();

  constructor(private cartService: CartService, private http: HttpClient) {
    this.productsObservable = cartService.get_carts();
    this.productsObservable.subscribe(carts => this.carts = carts.sort((n1,n2) => n1.parent.id - n2.parent.id));  
  
  }

 ngOnInit() {  
 }

  get_Cart(id: number): Cart {
    return this.carts.find(i => i.id == id)
  }

  createNewCard(clickCart: Cart) {
    
    this.cardObj = {
      "name": "",
      "pos": "",
      "email": "",
      "img": "",
      "startedAt": "",
      "bio": "",
      "parent": this.parent,
      "childNum": 0,
      "child": {}
    }    

    this.http.post("https://5d72531d5acf5e0014730cb8.mockapi.io/api/ocv/1/cart/", this.cardObj).subscribe((res: Cart) => {
      this.updateChildNumber(res)
              this.trigger.emit("true");
    })
    this.selectedCart = clickCart;

    //this.updateChildNumber()
  }

  delete_Cart(clickCart: Cart){
    
    this.objCart = this.get_Cart(clickCart.parent.id)

    this.objCart.childNum--;

    this.cartService.updateCart(this.objCart).subscribe()

    /*if(clickCart.child > 0){

      findChild()
      changeChildParent()

    }*/

      this.cartService.deleteCart(clickCart.id).subscribe((res: Response)=>{
      this.trigger.emit("true");
    })

  }

  get_Detail(newCart: Cart) {
    this.detail = true;
    this.selectedCart = newCart;
    this.cartService.changeMessage(this.detail, this.selectedCart);
    console.log(this.carts)
   // console.log(this.parentSum)

  }

  getParent(parent: Cart){
    this.parent = parent;

   // console.log(this.parent);
  }

 /* getChildren(child: Cart){
    /*this.getParent(parent);
    this.childCarts.push(this.get_Pcarts(parent.id))
    return this.childCarts;
    console.log(this.childCarts)
    console.log(this.get_Cart(id));
    this.childCarts = this.get_Cart(id)
    console.log(this.childCarts);
    return this.childCarts;*/
   /* this.child = child
    console.log(this.child)
    console.log(this.parent)
         
}*/

 /* findChild(clickCart: Cart)  {
    this.child.push(clickCart)
  }*/

 /* getCarts(): Cart[]{
    return this.carts.slice(1,4);
  }*/


  updateChildNumber(child: Cart)
  {
    console.log(child)
    this.child.push(child)
    //console.log(parent)
    /*  this.incChildNum = {
      "name": "",
      "pos": "",
      "email": "",
      "img": "",
      "startedAt": "",
      "bio": "",
      "parent": this.parent,
      "child": this.child,
      "childNum": this.selectedCart.childNum++     
   }  */

   this.selectedCart.child.push(this.child[0]);
   this.selectedCart.childNum++;  
    console.log(this.child[0])
    //console.log(this.carts.length)
    this.cartService.updateCart(this.selectedCart).subscribe()
  }

  deneme() //getHaveParentNum
  {
    let sayac = 0
    for(let j = 0; j < this.parentNumSum.length ;j++){
     for( let i = 0; i < this.carts.length; i++){
        if(this.carts[i].parent.id == this.parentNumSum[j]){
          sayac++;          
        }      
    }
      this.parentSum.push(sayac)
      sayac = 0;
  }
 //console.log(this.parentSum)
}

}