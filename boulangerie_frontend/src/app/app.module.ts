import { Store } from '../store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';


const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),

    // Custom Modules
    HomeModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
