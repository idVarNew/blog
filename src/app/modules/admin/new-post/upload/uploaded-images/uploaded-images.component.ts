import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrls: ['./uploaded-images.component.scss']
})
export class UploadedImagesComponent implements OnInit {
  @Input()
  imageFiles
  @Output()
  deleteImageFromNewPostEE: EventEmitter<img> = new EventEmitter<img>();
  @Output()
  setCoverPhotoEE: EventEmitter<img> = new EventEmitter<img>();
 
  constructor() {}

  ngOnInit() {}

  setCoverPhoto(name: string, index: number) {
    this.setCoverPhotoEE.emit({ name, index });
  }
  deleteImageFromNewPost(name: string, index: number) {
    this.deleteImageFromNewPostEE.emit({ name, index });
  }
}
interface img {
  name: string;
  index: number;
}
