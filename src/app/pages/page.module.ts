import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StorageComponent } from './storage/storage.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    IonicModule
  ],
  exports:
  [
  ]
})
export class PageModule { }
