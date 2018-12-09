import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PostModel } from '../../../../shared/models/index';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss', '../edit-post.component.scss']
})
export class LabelsComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  labels: Array<string>;
  @Input()
  allLabels: Array<string>;

  @Output()
  removeLabelEE : EventEmitter<string>= new EventEmitter<string>();
  @Output()
  addPrevLabelEE: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  addNewLabelEE: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('labelInput')
  labelInput: ElementRef;
  noLabels = true;

  constructor() {}

  ngOnInit() {

  }

  removeLabel(label: string) {
    this.removeLabelEE.emit(label);
  }

  addPrevLabel(label: string) {
    this.addPrevLabelEE.emit(label);
  }

  addNewLabel(label: string) {
    this.addNewLabelEE.emit(label.trim());
    this.labelInput.nativeElement.value = '';
  }
  enable() {
    if (this.labelInput.nativeElement.value !== '') {
      this.noLabels = false;
    } else {
      this.noLabels = true;
    }
  }
}
