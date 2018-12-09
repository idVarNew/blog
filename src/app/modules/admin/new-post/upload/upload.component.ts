import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PostModel, PostImagesModel } from '../../../../shared/models/index';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from '../../shared/models/file-upload';
import { UploadFileService } from '../../services/upload-image.service';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {
  @Input()
  post: PostModel;
  @Output()
  setCoverPhotoEE: EventEmitter<img> = new EventEmitter<img>();
  @ViewChild('fileUploader')
  fileUploader: ElementRef;
  @ViewChild("progress")
  progressBar;
  progress: { percentage: number } = { percentage: 0 };
  selectedFiles: FileList;
  uploadedImage: File;
  imagePreview;
  allUploaded: Array<{ file: File; url: string }> = [];
  uploadedLargeImage: File;

  constructor(
    private uploadService: UploadFileService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.uploadService.uploadeImages.subscribe((imageFile: { file: File; url: string }) => {
      if (imageFile['url'].includes('size-550-')) {
        this.allUploaded.push(imageFile);
        this.resetImageInput();
      }
    });
  }
  ngAfterViewInit() {
    console.log(this.progressBar);
  }
  resetImageInput() {
    this.imagePreview = false;
    this.fileUploader.nativeElement.value = null;
    this.progress.percentage = 0
  }
  
  setCoverPhoto(image: { name: string; index: number }) {
   this.allUploaded.unshift(this.allUploaded.splice(image.index, 1)[0]);
    this.setCoverPhotoEE.emit(image)
  }
  deleteImageFromNewPost(image: { imgName: string; index: number }) {
    this.allUploaded.splice(image.index, 1);
    this.uploadService.deleteFileStorage(image.imgName);
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
    const imageId =generateId()
    function generateId(): string {
      return (
      `${Math.random().toString(36).substr(2, 9)}`
      );
    }
    this.ng2ImgMax.resizeImage(file, 550, 10000).subscribe(
      result => {
        this.uploadedImage = new File([result], 'size-550-' +imageId + result.name);
        this.getImagePreview(this.uploadedImage);
      },
      error => {
        console.log('Oh no!', error);
      }
    );
    this.ng2ImgMax.resizeImage(file, 1000, 10000).subscribe(
      result => {
        this.uploadedLargeImage = new File([result], 'size-800-'+ imageId + result.name);
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
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.uploadService.pushFileToStorage(this.uploadedImage, this.progress);
    this.uploadService.pushFileToStorage(this.uploadedLargeImage, this.progress);
  }
}
interface img{
  name: string; 
  index: number; 
}