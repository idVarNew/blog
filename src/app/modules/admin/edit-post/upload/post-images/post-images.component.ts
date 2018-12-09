import { PostModel } from './../../../../../shared/models/post.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-images',
  templateUrl: './post-images.component.html',
  styleUrls: ['./post-images.component.scss']
})
export class PostImagesComponent implements OnInit {
  @Input()
  post: PostModel;
  @Output()
  deleteImageFromEditPostEE : EventEmitter<img> = new EventEmitter<img>();
  @Output()
  setCoverPhotoEE: EventEmitter<img> = new EventEmitter<img>();
 
  constructor() {}

  ngOnInit() {}

  deleteImageFromEditPost(name: string, index: number, postId: string) {
    this.deleteImageFromEditPostEE.emit({ name, index, postId });
  }
  setCoverPhoto(name: string, index: number, postId: string) {
    this.setCoverPhotoEE.emit({ name, index, postId });
  }
}
interface img{
  name?: string; 
  index?: number; 
  postId?: string 
}