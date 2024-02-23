import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTabPageRoutingModule } from './search-tab-routing.module';

import { SearchTabPage } from './search-tab.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTabPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [SearchTabPage]
})
export class SearchTabPageModule {}
