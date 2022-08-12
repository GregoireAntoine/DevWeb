import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/home/home.component';
import { ArticleComponent } from './component/article/article.component';
import { AppComponent } from './app.component';
import { ArticleCategoryComponent } from './component/article-category/article-category.component';
import { CartComponent } from './component/cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateorderComponent } from './component/dateorder/dateorder.component';
import { FormsModule } from '@angular/forms';
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { MycommandComponent } from './component/mycommand/mycommand.component';

@NgModule({

  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    ArticleCategoryComponent,
    CartComponent,
    DateorderComponent,
    CheckoutComponent,
    OrderConfirmComponent,
    MycommandComponent,
   ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgxHorizontalTimelineModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
