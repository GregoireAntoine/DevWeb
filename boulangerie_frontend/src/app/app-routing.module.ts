import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { ArticleCategoryComponent } from './component/article-category/article-category.component'
const routes: Routes = [

  {path:'products', component: ArticleComponent},
  {path:'article_category', component: ArticleCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
