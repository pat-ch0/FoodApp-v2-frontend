import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { SlidingComponent } from './components/sliding/sliding.component';



@NgModule({
  declarations: [ProductDetailComponent SlidingComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SlidingComponent,
  ]
})
export class SharedModule { }
