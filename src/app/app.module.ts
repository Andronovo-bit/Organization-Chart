import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { CartService } from './cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartComponent } from './cart/cart.component';
import { CreateDivComponent } from './create-div/create-div.component';
import { ParentCartComponent } from './parent-cart/parent-cart.component';
import { ChildCartComponent } from './child-cart/child-cart.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule,
  MatButtonModule, MatCheckboxModule, MatInputModule , MatSelectModule, MatCardModule, MatDatepickerModule, MatMenuModule, HttpClientModule],

  declarations: [ AppComponent, CartDetailComponent, CartComponent, CreateDivComponent, ParentCartComponent, ChildCartComponent ],

  bootstrap:    [ AppComponent ],
  
  providers: [CartService]
})
export class AppModule { }
