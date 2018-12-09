import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AppActions from '../../../store/actions';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StoreModel, PostModel, PostImageModel, PostImagesModel, NewPost } from 'src/app/shared/models/index';
import { UploadFileService } from '../services/upload-image.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  NewPostForm: FormGroup;
  labels: Array<string> = [];
  allLabels: Array<string> = [];
  imageFiles: PostImagesModel = {
    small: [],
    large: []
  };


  constructor(
    private store: Store<StoreModel>,
    private router: Router,
    private fb: FormBuilder,
    private uploadService: UploadFileService
  ) {}

 

  ngOnInit() {
    this.store.select('posts').subscribe((posts: Array<PostModel>) => {
      posts.forEach((post: PostModel) => {
        const labels: Array<string> = this.allLabels.concat(post.labels);
        this.allLabels = Array.from(new Set(labels));
      });
    });

    this.NewPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]]
    });

    this.uploadService.downloadURL.subscribe((image: PostImageModel) => {
      if (image['url'].includes('size-550-')) {
        this.imageFiles.small.push(this.generateSizeVersions(image));
      } else {
        this.imageFiles.large.push(this.generateSizeVersions(image));
      }
    });
  }
  private generateSizeVersions(image: PostImageModel): PostImageModel {
    const version: PostImageModel = {
      name: image['name'],
      url: image['url']
    };
    return version;
  }
  setCoverPhoto(image: { name: string; index: number }) {
    const cover: PostImagesModel = Object.assign({}, this.imageFiles);

    cover.small.unshift(cover.small.splice(image.index, 1)[0]);
    cover.large.unshift(cover.large.splice(image.index, 1)[0]);
    this.imageFiles = cover;
  }

  onSubmit() {
    const newPost: NewPost = {
      ...this.NewPostForm.value,
      id: generateId(),
      publishDate: new Date(),
      labels: this.labels,
      img: this.imageFiles
    };

    function generateId(): string {
      return (
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    }
    this.store.dispatch(new AppActions.addNewPost(newPost));
    this.router.navigate(['/posts']);
  }

  removeLabel(label: string) {
    this.labels = this.labels.filter((item: string) => {
      return item !== label;
    });
  }

  addNewLabel(labelValue) {
    this.labels.push(labelValue.value);
  }

  addPrevLabel(label: string) {
    if (this.labels.indexOf(label) === -1) {
      this.labels.push(label);
    }
  }
}
