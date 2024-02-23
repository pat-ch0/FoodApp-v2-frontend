import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service/product/product.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductDetail } from '@type/products/product-detail.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetail | undefined; // The product details to display.
  barcode: string | null = ''; // The barcode of the product to fetch.
  isLoading = false; // Indicates if the loading spinner should be shown.

  /**
   * Initializes the product detail component with necessary services.
   * @param route Provides access to information about a route associated with the component.
   * @param productService Service to fetch product details from the backend.
   * @param loadingController Ionic's controller for handling loading spinner.
   * @param toastController Ionic's controller for displaying toast notifications.
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.barcode = this.route.snapshot.paramMap.get('barcode');
    const loading = await this.createLoading();
    await loading.present();
    this.isLoading = true;

    try {
      await this.getProduct();
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  /**
   * Creates a loading indicator instance.
   * @returns A promise that resolves to an HTMLIonLoadingElement.
   */
  private async createLoading() {
    return this.loadingController.create({ message: 'Loading...' });
  }

  /**
   * Fetches product details using the barcode.
   */
  private async getProduct() {
    // Check if the barcode is not null
    if (!this.barcode) {
      // Handle the absence of a barcode
      this.showToast('PRODUCT_DETAIL.NO_BARCODE_PROVIDED', 'warning');
      return;
    }

    try {
      const response = await this.productService.getProductByBarcode(this.barcode);
      this.product = response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  /**
   * Handles errors during product fetching.
   * @param error - The error object received.
   */
  private handleError(error: any) {
    const messageKey =
      error.status === 404
        ? 'PRODUCT_DETAIL.PRODUCT_NOT_FOUND'
        : 'PRODUCT_DETAIL.ERROR_FETCHING_DETAILS';
    this.showToast(messageKey, 'warning');
  }

  /**
   * Displays a toast notification with a custom message.
   * @param message The message to be displayed in the toast.
   */
  private showToast(key: string, color: 'success' | 'warning' | 'danger') {
    this.translate.get(key).subscribe(async (message: string) => {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: color, // 'success' for positive messages, 'warning' for caution, and 'danger' for errors
      });
      toast.present();
    });
  }
}
