import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { ArticleComponent } from './component/article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateorderComponent } from './component/dateorder/dateorder.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CheckoutComponent } from './component/checkout/checkout.component';
import {DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { ArticleCategoryComponent } from './component/article-category/article-category.component';
import { MycommandComponent } from './component/mycommand/mycommand.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { RGPDComponent } from './component/rgpd/rgpd.component';
import { CDVComponent } from './component/cdv/cdv.component';

@NgModule({

  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    CartComponent,
    HeaderComponent,
    DateorderComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    OrderConfirmComponent,
    ArticleCategoryComponent,
    MycommandComponent,
    RGPDComponent,
    CDVComponent,


  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MdbDropdownModule,
    NgxHorizontalTimelineModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
