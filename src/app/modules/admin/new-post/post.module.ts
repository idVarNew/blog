
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { LabelsComponent } from './labels/labels.component';
import { UploadComponent } from './upload/upload.component';
import { NewPostComponent } from './new-post.component';
import { EditPostModule } from '../edit-post/edit-post.module';
import { UploadedImagesComponent } from './upload/uploaded-images/uploaded-images.component';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { ProgressBarComponent } from './upload/progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule,
    EditPostModule,
    AdminSharedModule
  ],
  declarations: [
    NewPostComponent,
    LabelsComponent,
    UploadComponent,
    UploadedImagesComponent,
    ProgressBarComponent
  ],
  exports: [NewPostComponent]
})
export class NewPostModule {}
