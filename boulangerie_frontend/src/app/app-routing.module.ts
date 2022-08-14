import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ArticleComponent } from './component/article/article.component';
import { DateorderComponent } from './component/dateorder/dateorder.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component'
import { ArticleCategoryComponent } from './component/article-category/article-category.component'
import { MycommandComponent } from './component/mycommand/mycommand.component';
const routes: Routes = [
  {path:'', redirectTo:'products',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'products', component: ArticleComponent},
  {path:'cart', component: CartComponent},
  {path:'dateorder', component: DateorderComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'order_confirm', component: OrderConfirmComponent},
  {path:'article_category', component: ArticleCategoryComponent},
  {path:'mycommand', component: MycommandComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
