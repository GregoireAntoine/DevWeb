import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleComponent } from './component/article/article.component';
import { AppComponent } from './app.component';
import { ArticleCategoryComponent } from './component/article-category/article-category.component';
import { CartComponent } from './component/cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';

@NgModule({

  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleCategoryComponent,
    CartComponent,

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
