import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { SlidingComponent } from './components/sliding/sliding.component';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule.forChild(),

  ],
  exports: [
    ProductDetailComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
