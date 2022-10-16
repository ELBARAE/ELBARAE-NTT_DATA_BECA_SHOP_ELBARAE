import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { ShopLeftSidebarComponent } from './shop-left-sidebar/shop-left-sidebar.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'shop-grid', component: ShopGridComponent},
  {path: "shop-left-sidebar", component: ShopLeftSidebarComponent},
  {path: "shop-list", component: ShopListComponent},
  {path: "shopping-cart", component: ShoppingCartComponent},
  {path: 'blog', component: BlogComponent},
  {path: "login", component: LoginComponent},
  {path: "single-blog", component: SingleBlogComponent},
  {path: "faq", component: FaqComponent},
  {path: "shipping-info", component: ShippingInfoComponent},
  {path: "completed-order", component: CompletedOrderComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path: '**', pathMatch: 'full', component: PagenotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
