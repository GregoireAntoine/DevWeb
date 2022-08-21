import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './containers/home/home.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from 'src/home/containers/products/products.component';
import { AuthComponent } from 'src/home/containers/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from 'src/home/containers/cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DateorderComponent} from "./containers/dateorder/dateorder.component";
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';

// Material Modules
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { CheckoutComponent } from './containers/checkout/checkout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dateorder', component: DateorderComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent,
    ProductsComponent,
    CartComponent,
    DateorderComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxHorizontalTimelineModule,
    MatInputModule,
    MatFormFieldModule,

    // Custom Modules
    SharedModule,
    FontAwesomeModule,
    MatDatepickerModule,
  ]
})
export class HomeModule { }
