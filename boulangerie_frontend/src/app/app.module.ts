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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from "@angular/material/datepicker";

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    MatDatepickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxHorizontalTimelineModule,

    // Custom Modules
    HomeModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
