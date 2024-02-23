import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { SlidingComponent } from './components/sliding/sliding.component';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { ProductStockComponent } from '../pages/product/product-stock/product-stock.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StorageComponent } from '../pages/storage/storage.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductStockComponent,
    StorageComponent,
    FormModalComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),

  ],
  exports: [
    ProductDetailComponent,
    ProductStockComponent,
    FormModalComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
