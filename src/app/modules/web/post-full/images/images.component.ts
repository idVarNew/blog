import { PostModel } from 'src/app/shared/models/index';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  imgIndex: number;
  @Output()
  nextImageEE :EventEmitter<void> = new EventEmitter<void>();
  @Output()
  prevImageEE :  EventEmitter<void>= new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  nextImage() {
    this.nextImageEE.emit();
  }
  prevImage() {
    this.prevImageEE.emit();
  }
}
