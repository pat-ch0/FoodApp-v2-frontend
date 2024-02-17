import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageTabPageRoutingModule } from './storage-tab-routing.module';

import { StorageTabPage } from './storage-tab.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageTabPageRoutingModule,
    SharedModule
  ],
  declarations: [StorageTabPage]
})
export class StorageTabPageModule {}
