import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { HomeComponent } from './component/home/home.component';
import { ArticleCategoryComponent } from './component/article-category/article-category.component'
import { DateorderComponent } from './component/dateorder/dateorder.component';
const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'products', component: ArticleComponent},
  {path:'article_category', component: ArticleCategoryComponent},
  {path:'dateorder', component: DateorderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
