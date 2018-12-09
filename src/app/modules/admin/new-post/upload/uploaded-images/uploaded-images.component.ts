import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrls: ['./uploaded-images.component.scss']
})
export class UploadedImagesComponent implements OnInit {
  @Input()
  allUploaded: Array<{ file: File; url: string }>;
  @Output()
  deleteImageFromNewPostEE: EventEmitter<{ imgName: string; index: number }> = new EventEmitter<{
    imgName: string;
    index: number;
  }>();
  @Output()
  setCoverPhotoEE: EventEmitter<img> = new EventEmitter<img>();
 
  constructor() {}

  ngOnInit() {}

  setCoverPhoto(name: string, index: number) {
    this.setCoverPhotoEE.emit({ name, index });
  }
  deleteImageFromNewPost(imgName: string, index: number) {
    this.deleteImageFromNewPostEE.emit({ imgName, index });
  }
}
interface img {
  name: string;
  index: number;
}
