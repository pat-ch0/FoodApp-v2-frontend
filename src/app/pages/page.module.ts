import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule
  ],
  exports:
  [
  ]
})
export class PageModule { }
