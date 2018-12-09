import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostFullRoutingModule } from './post-full-routing.module';
import { PostFullComponent } from './post-full.component';
import { CommentsComponent } from './comments/comments.component';
import { RandomPostsComponent } from './random-posts/random-posts.component';
import { ShareModule } from '@ngx-share/core';
import { ImagesComponent } from './images/images.component';
import { SocialComponent } from './social/social.component';
import { PostNavigationComponent } from './post-navigation/post-navigation.component';
import { LabelsComponent } from './labels/labels.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PostFullRoutingModule,
    ReactiveFormsModule,
    ShareModule.forRoot()
  ],
  declarations: [
    PostFullComponent,
   CommentsComponent,
   RandomPostsComponent,
   ImagesComponent,
   SocialComponent,
   PostNavigationComponent,
   LabelsComponent,  
  ],
  exports: [
    PostFullComponent
  ]
})
export class PostFullModule {}
