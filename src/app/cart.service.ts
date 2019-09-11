import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cart } from './cart.model';



@Injectable()

export class CartService {

  baseUrl:string = "https://5d72531d5acf5e0014730cb8.mockapi.io/api/ocv/1/";

  private messageSoruce = new BehaviorSubject<boolean>(false);
  private cartDetails = new BehaviorSubject<Cart>(undefined);
  private loadPageMes = new BehaviorSubject<boolean>(false);

  currentMessage = this.messageSoruce.asObservable();
  currentCart = this.cartDetails.asObservable();
  currentLoad = this.loadPageMes.asObservable();

  constructor(private http: HttpClient) { }

  get_carts(){
    return this.http.get<Cart[]>(this.baseUrl + 'cart/')
  }
  
  loadPageServc(mes: boolean){
    this.loadPageMes.next(mes)
  }

  get_cart(id: number): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + 'cart/' + id)
  }

  createCarts(cart: Cart): Observable<Cart>{
    return this.http.post<Cart>(this.baseUrl + 'cart/' , JSON.stringify(cart));  
  }

  updateCart(cart: Cart): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'cart/' + cart.id, cart)
  }

  deleteCart(id: number){
    return this.http.delete(this.baseUrl + 'cart/' + id)
  }
  
  changeMessage(message: boolean, cartDetail: Cart){
    this.cartDetails.next(cartDetail)
    this.messageSoruce.next(message)
  }


}