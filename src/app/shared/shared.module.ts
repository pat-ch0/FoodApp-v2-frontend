import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidingComponent } from './components/sliding/sliding.component';



@NgModule({
  declarations: [ SlidingComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SlidingComponent,
  ]
})
export class SharedModule { }
