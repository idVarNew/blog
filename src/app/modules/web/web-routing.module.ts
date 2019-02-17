import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';

export const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        loadChildren: './posts/posts.module#PostsModule'
      },
      {
        path: 'posts/:id',
        loadChildren: './post-full/post-full.module#PostFullModule'
      },
      {
        path: 'search',
        loadChildren: './search-results/search-results.module#SearchResultsModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {}
