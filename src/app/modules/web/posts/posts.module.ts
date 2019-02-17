import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { PostsComponent } from './posts.component';
import { NgxMasonryModule } from 'ngx-masonry';

//import { PostCardComponent } from '../post-card/post-card.component';
import { PostCardModule } from '../post-card/post-card.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,  
    PostsRoutingModule,
    ReactiveFormsModule,
    NgxMasonryModule,
   /// NgMasonryGridModule,
    NgxPaginationModule,
    PostCardModule
  ],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule {}
