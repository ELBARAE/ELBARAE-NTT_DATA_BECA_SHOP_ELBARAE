import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { ShopLeftSidebarComponent } from './shop-left-sidebar/shop-left-sidebar.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    AboutUsComponent,
    ContactComponent,
    ProductDetailsComponent,
    PagenotFoundComponent,
    ShopLeftSidebarComponent,
    ShopListComponent,
    ShoppingCartComponent,
    LoginComponent,
    CompletedOrderComponent,
    ShippingInfoComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
