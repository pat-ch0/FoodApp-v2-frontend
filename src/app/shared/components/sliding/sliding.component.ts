import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageType } from 'src/app/types/storage.type';
@Component({
  selector: 'app-sliding',
  templateUrl: './sliding.component.html',
  styleUrls: ['./sliding.component.scss'],
})
export class SlidingComponent implements OnInit {

  @Output() deleteRequest = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() clickRequest = new EventEmitter();
  @Input() iconPath!: string;
  @Input() name!: string;
  @Input() detail!: string;
  constructor() { }

  onClickDelete() {
    this.deleteRequest.emit();
  }

  onClickEdit() {
    this.editRequest.emit();
  }

  onClickSliding() {
    this.clickRequest.emit();
  }

  ngOnInit() {
  
  }

}
