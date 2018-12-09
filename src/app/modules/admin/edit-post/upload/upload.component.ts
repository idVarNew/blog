import { UploadFileService } from './../../services/upload-image.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PostModel, PostImageModel, PostImagesModel } from '../../../../shared/models/index';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', '../edit-post.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input()
  post: PostModel;
  @Input()
  imageFiles;
  @Input()
  param;
  @Output()
  deleteImageFromEditPostEE: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  setCoverPhotoEE: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileUploader')
  fileUploader: ElementRef;
  progress: { percentage: number } = { percentage: 0 };
  selectedFiles: FileList;
  imagePreview;
  uploadSmalledImage: File;
  uploadedLargeImage: File;
  imagesVisible = true;
  uploading: boolean;
  resetSub;


  constructor(
    private uploadService: UploadFileService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.resetSub = this.uploadService.downloadURL.subscribe(image => {
      if (image['url'].includes('size-800-')) {
        this.resetImageInput();
      }
    });
  }

  setCoverPhoto(image: { name: string; index: number; postId: string }) {
    this.setCoverPhotoEE.emit(image)
  }

  deleteImageFromEditPost(image: { name: string; index: number; postId: string }) {
    this.deleteImageFromEditPostEE.emit(image);
  }

  resetImageInput() {
    this.fileUploader.nativeElement.value = null;
    this.uploading = false;
  }

  private getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  selectFile(event) {
    function generateId(): string {
      return (
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    }

    const file = event.target.files.item(0);
    const imageId = generateId();

     this.ng2ImgMax.resizeImage(file, 550, 10000).subscribe(
      result => {
        this.uploadSmalledImage = new File([result], 'size-550-' + imageId + result.name);
        this.getImagePreview(this.uploadSmalledImage);
      },
      error => {
        console.log('Oh no!', error);
      }
    );

     this.ng2ImgMax.resizeImage(file, 800, 10000).subscribe(
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
    
    this.uploadService.pushFileToStorage(this.uploadSmalledImage, this.progress);
    this.uploadService.pushFileToStorage(this.uploadedLargeImage, this.progress);
  }

  ngOnDestroy() {
    this.resetSub.unsubscribe();
  }
}
