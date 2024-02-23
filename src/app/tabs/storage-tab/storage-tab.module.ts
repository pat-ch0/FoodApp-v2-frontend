import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageTabPageRoutingModule } from './storage-tab-routing.module';
import { AlertController } from '@ionic/angular';

import { StorageTabPage } from './storage-tab.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StorageTabPageRoutingModule,
    SharedModule
  ],
  declarations: [StorageTabPage]
})
export class StorageTabPageModule {}
