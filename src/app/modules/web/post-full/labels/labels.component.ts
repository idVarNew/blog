import { PostModel } from 'src/app/shared/models/index';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  @Input()
  post: PostModel;
  @Output()
  filterByLabelEE :EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  filterByLabel(label: string) {
     this.filterByLabelEE.emit(label);
  }
}
