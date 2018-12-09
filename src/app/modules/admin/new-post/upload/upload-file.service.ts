import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {  Subject } from 'rxjs';
//import { FileUpload } from './fileupload';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private basePath = '/uploads';
  downloadURL = new Subject();
  uploadeImages = new Subject();

  constructor(private db: AngularFireDatabase) {}
/*
  pushFileToStorage(fileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.name}`).put(fileUpload);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      error => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          this.uploadeImages.next({
            file: fileUpload,
            url: downloadURL
          });
          this.downloadURL.next({ url: downloadURL, name: fileUpload.name });
          this.downloadURL.complete;
        });
      }
    );
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }
  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}


*/

}
/*

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable, Subject } from 'rxjs';
import { FileUpload } from './fileupload';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private basePath = '/uploads';
  downloadURL = new Subject();
  uploadeImages = new Subject();

  constructor(private db: AngularFireDatabase) {}

  pushFileToStorage(fileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.name}`).put(fileUpload);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      error => {
        // fail
        console.log(error);
      },
      () => {
        // success

        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadeImages.next({
            file: fileUpload,
            url: downloadURL
          });
          this.downloadURL.next({ url: downloadURL, name: fileUpload.name });
         });
      }
    );
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
*/