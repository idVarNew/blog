import { NewPostComponent } from './new-post/new-post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PostsComponent } from './posts/posts.component';
import { SettingsComponent } from './settings/settings.component';
import { CommentsComponent } from './comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'new-post',
        component: NewPostComponent
      },
      {
        path: 'posts/edit-post/:id',
        component: EditPostComponent
      },
       { path: 'settings', component: SettingsComponent },
      { path: 'comments', component: CommentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
