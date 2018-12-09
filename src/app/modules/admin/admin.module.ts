import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SettingsComponent } from './settings/settings.component';
import { NewPostModule } from './new-post/post.module';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsComponent } from './posts/options/options.component';
import { AlertComponent } from './posts/alert/alert.component';
import { BarComponent } from './bar/bar.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NewPostModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    SettingsComponent,
    CommentsComponent,
    PostsComponent,
    OptionsComponent,
    AlertComponent,
    BarComponent,
    NavigationComponent,
   ],
  exports: [AdminComponent]
})
export class AdminModule {}
