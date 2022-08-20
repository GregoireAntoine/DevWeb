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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
    // Custom Modules
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
