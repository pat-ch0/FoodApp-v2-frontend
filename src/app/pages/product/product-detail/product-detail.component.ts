import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service/product/product.service';
import { LoadingController } from '@ionic/angular';
import { ProductDetail } from '@type/products/product-detail.type';
import { HandleError } from '@service/errors/handle-error.service'

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
    private handleError: HandleError
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
      this.handleError.showToast('PRODUCT_DETAIL.NO_BARCODE_PROVIDED', 'warning');
      return;
    }

    try {
      const response = await this.productService.getProductByBarcode(this.barcode);
      this.product = response.data;
    } catch (error: any) {
      this.handleError.handleError(error, 'PRODUCT_DETAIL', 'PRODUCT_NOT_FOUND', 'ERROR_FETCHING_DETAILS');
    }
  }
}
