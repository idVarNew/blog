import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { EditPostComponent } from './edit-post.component';
import { LabelsComponent } from './labels/labels.component';
import { UploadComponent } from './upload/upload.component';
import { PostImagesComponent } from './upload/post-images/post-images.component';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { ProgressBarComponent } from './upload/progress-bar/progress-bar.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AdminSharedModule
  ],
  declarations: [
    EditPostComponent,
    LabelsComponent,
    UploadComponent,
    PostImagesComponent,
    ProgressBarComponent
  ],
  exports: [ EditPostComponent]
})
export class EditPostModule {}
