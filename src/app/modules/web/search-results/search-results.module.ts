
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { PostsModule } from '../posts/posts.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SearchResultsRoutingModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    NgMasonryGridModule,
    NgxPaginationModule,
    PostsModule
  ],
  declarations: [SearchResultsComponent],
  exports: [SearchResultsComponent]
})
export class SearchResultsModule {}
