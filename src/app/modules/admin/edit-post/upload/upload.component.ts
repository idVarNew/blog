import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PostModel, PostImageModel, PostImagesModel } from '../../../../shared/models/index';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', '../edit-post.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input()
  post: PostModel;
  @Input()
  param
  @Output()
  deleteImageFromEditPostEE: EventEmitter<Img> = new EventEmitter<Img>();
  @Output()
  setCoverPhotoEE: EventEmitter<Img> = new EventEmitter<Img>();
  @ViewChild('fileUploader')
  fileUploader: ElementRef;

  progress: { percentage: number } = { percentage: 0 };
  selectedFiles: FileList;
  imagePreview;
  allUploaded: Array<PostImageModel> = [];
  uploadSmalledImage: File;
  uploadedLargeImage: File;
  imagesVisible = true;
sub1
sub2
  constructor(
    private uploadService: UploadFileService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.uploadService.uploadeImages.subscribe((imageFile: PostImageModel) => {
      if (imageFile['url'].includes('size-550-')) {
        this.allUploaded.push(imageFile);
        this.resetImageInput();
      }
    });
  }

  setCoverPhoto(image: { name: string; index: number; postId: string }) {
    const cover: PostImagesModel = Object.assign({}, this.post.img);

    cover.small.unshift(cover.small.splice(image.index, 1)[0]);
    cover.large.unshift(cover.large.splice(image.index, 1)[0]);
  }

  deleteImageFromEditPost(image: { name: string; index: number; postId: string }) {
    const imageToDelete: PostImagesModel = Object.assign({}, this.post.img);

    imageToDelete.small.splice(image.index, 1);
    imageToDelete.large.splice(image.index, 1);
    this.deleteImageFromEditPostEE.emit({ imageToDelete, postId: image.postId });
    this.uploadService.deleteFileStorage(image.name);
  }

  resetImageInput() {
    this.imagePreview = false;
    this.fileUploader.nativeElement.value = null;
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

    this.sub1 = this.ng2ImgMax.resizeImage(file, 550, 10000).subscribe(
      result => {
        this.uploadSmalledImage = new File([result], 'size-550-' + imageId + result.name);
        this.getImagePreview(this.uploadSmalledImage);
      },
      error => {
        console.log('Oh no!', error);
      }
    );

    this.sub2 =  this.ng2ImgMax.resizeImage(file, 800, 10000).subscribe(
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
   // const file = this.selectedFiles.item(0);
  //  this.selectedFiles = undefined;

    this.uploadService.pushFileToStorage(this.uploadSmalledImage, this.progress);
   this.uploadService.pushFileToStorage(this.uploadedLargeImage, this.progress);
  }
 
  ngOnDestroy(){
 
  }
}

interface Img {
  imageToDelete: PostImagesModel;
  postId: string;
}
