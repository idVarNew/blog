import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './post-card.component';
import { WebRoutingModule } from '../web-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,  
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [PostCardComponent ],
  exports: [PostCardComponent]
})
export class PostCardModule {}
