import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './home/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  exports: [],
})
export class PageModule {}
