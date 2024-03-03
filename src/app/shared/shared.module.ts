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
import { HomeComponent } from '../pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductStockComponent,
    StorageComponent,
    ChatModalComponent,
    FormModalComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  exports: [
    ProductDetailComponent,
    ProductStockComponent,
    ChatModalComponent,
    FormModalComponent,
    SlidingComponent,
    LanguagePickerComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    HomeComponent,
  ]
})
export class SharedModule { }
