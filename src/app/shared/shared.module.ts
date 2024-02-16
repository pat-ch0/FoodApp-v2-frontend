import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    
  ]
})
export class SharedModule { }
