import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommunityTabPageRoutingModule } from './community-tab-routing.module';
import { CommunityTabPage } from './community-tab.page';
import { SharedModule } from '@Shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityTabPageRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [CommunityTabPage],
})
export class CommunityTabPageModule {}
