import { PostImagesComponent } from './upload/post-images/post-images.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, map, first, tap } from 'rxjs/operators';
import * as AppActions from '../../../store/actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StoreModel, PostModel, PostImagesModel, PostImageModel, NewPost } from 'src/app/shared/models/index';
import { UploadFileService } from './upload/upload-file.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: PostModel;
  NewPostForm: FormGroup;
  allLabels: Array<string> = [];
  labels: Array<string>=[];
  imageFiles: PostImagesModel;
  downloadURLSub
  param :string;
  activeRouteSub
  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<StoreModel>,
    private router: Router,
    private fb: FormBuilder,
    private uploadService: UploadFileService
  ) {}

  ngOnInit() {

    this.activeRouteSub = this.activeRoute.paramMap
      .pipe(
        switchMap((param: ParamMap) => {
          return this.store.select('posts').pipe(
            tap((posts: Array<PostModel>) => {
              this.getAllLabels(posts);
            }),

            map((posts: Array<PostModel>) => {
              return posts.filter((post: PostModel) => {
                if (post.id === param.get('id')) {
                  this.param = param.get('id');
                  this.labels = post.labels
                  this.post =  post;
                  this.imageFiles = this.post['img'];
                  return post;
                }
              });
            })
          );
        })
      )
      .subscribe();

    this.downloadURLSub = this.uploadService.downloadURL.subscribe((image: PostImageModel) => {
      this.getImages(image);
    });

    this.NewPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnDestroy() {
    this.activeRouteSub.unsubscribe();
    this.downloadURLSub.unsubscribe();
  }

   getAllLabels(posts: Array<PostModel>) {
    posts.forEach((post: PostModel) => {
      const labels: Array<string> = this.allLabels.concat(post.labels);
      this.allLabels = Array.from(new Set(labels));
    });
  }

  getImages(image: PostImageModel) {

    if (this.param === this.post.id) {
      const smallSize: boolean = this.post.img.small.some(
        (item: PostImageModel): boolean => {
          return item.name === image['name'];
        }
      );

      const largeSize: boolean = this.post.img.large.some(
        (item: PostImageModel): boolean => {
          return item.name === image['name'];
        }
      );

      if (smallSize === false && this.post.img.small.length < 5) {
        if (image['url'].includes('size-550-')) {
          this.imageFiles.small.push(this.generateSizeVersions(image));
        }
      }

      if (largeSize === false && this.post.img.large.length < 5) {
        if (image['url'].includes('size-800-')) {
          this.imageFiles.large.push(this.generateSizeVersions(image));
        }
      }
    }
  }

  private generateSizeVersions(image: PostImageModel): PostImageModel {
    const version: PostImageModel = {
      name: image['name'],
      url: image['url']
    };
    return version;
  }

  onSubmit() {
    const images = Object.assign({}, this.imageFiles);

    const newPost: NewPost = {
      ...this.NewPostForm.value,
      labels: this.labels,
      img: images
    };

    this.store.dispatch(new AppActions.editPost({ id: this.post.id, post: newPost }));
    this.NewPostForm.reset();
    this.router.navigate(['/admin/posts']);
  }

  setCoverPhoto(postImage: { imageName: string; index: number; postId: string }) {
    this.store.dispatch(new AppActions.setCoverPhoto(postImage));
  }

  deleteImageFromEditPost(postImage: { imageToDelete: PostImagesComponent; postId: string }) {
    this.store.dispatch(new AppActions.deletePostImage(postImage));
  }

  removeLabel(label: string) {
    this.labels = this.labels.filter((item: string) => {
      return item !== label;
    });
  }

  addNewLabel(label: string) {
    this.labels.push(label);
  }

  addPrevLabel(label: string) {
    if (this.labels.indexOf(label) === -1) {
      this.labels.push(label);
    }
  }
}
