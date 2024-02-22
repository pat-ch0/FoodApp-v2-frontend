import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-sliding',
  templateUrl: './sliding.component.html',
  styleUrls: ['./sliding.component.scss'],
})
export class SlidingComponent  implements OnInit {

  @Input() title!: string;
  @Input() icon!: string;

  constructor() { }

  ngOnInit() {}

}
