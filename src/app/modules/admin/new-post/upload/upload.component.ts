import { PostImagesModel } from './../../../../shared/models/images.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PostModel } from '../../../../shared/models/index';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from '../../shared/models/file-upload';
import { UploadFileService } from '../../services/upload-image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  imageFiles: PostImagesModel;
  @Output()
  setCoverPhotoEE: EventEmitter<img> = new EventEmitter<img>();
  @Output()
  deleteImageFromNewPostEE: EventEmitter<img> = new EventEmitter<img>();
  @ViewChild('fileUploader')
  fileUploader: ElementRef;
  progress: { percentage: number } = { percentage: 0 };
  selectedFiles: FileList;
  uploadedImage: File;
  imagePreview;
  uploadedLargeImage: File;
  uploading: boolean;

  constructor(
    private uploadService: UploadFileService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.uploadService.downloadURL.subscribe((image: { url: string; name: string }) => {
      if (image['url'].includes('size-800-')) {
        this.resetImageInput();
      }
    });
  }

  resetImageInput() {
    this.fileUploader.nativeElement.value = null;
    this.uploading = false;
  }

  setCoverPhoto(image: { name: string; index: number }) {
    this.setCoverPhotoEE.emit(image);
  }

  deleteImageFromNewPost(image: { name: string; index: number }) {
    this.deleteImageFromNewPostEE.emit(image);
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    const imageId = generateId();
    function generateId(): string {
      return `${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }
    this.ng2ImgMax.resizeImage(file, 550, 10000).subscribe(
      result => {
        this.uploadedImage = new File([result], 'size-550-' + imageId + result.name);
        this.getImagePreview(this.uploadedImage);
      },
      error => {
        console.log('Oh no!', error);
      }
    );
    this.ng2ImgMax.resizeImage(file, 1000, 10000).subscribe(
      result => {
        this.uploadedLargeImage = new File([result], 'size-800-' + imageId + result.name);
        this.getImagePreview(this.uploadedLargeImage);
      },
      error => {
        console.log('Oh no!', error);
      }
    );

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.uploading = true;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.uploadService.pushFileToStorage(this.uploadedImage, this.progress);
    this.uploadService.pushFileToStorage(this.uploadedLargeImage, this.progress);
  }
}
interface img {
  name: string;
  index: number;
}
