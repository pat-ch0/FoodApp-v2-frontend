import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ProductService } from '@Service/product/product.service';
import { HandleError } from '@Service/errors/handle-error.service';
import { ProductDetail } from '@Type/products/product-detail.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-scan',
  templateUrl: './multi-scan.component.html',
  styleUrls: ['./multi-scan.component.scss'],
})
export class MultiScanComponent implements OnInit {
  scannedProducts: ProductDetail[] = [];
  isScannerAvailable = true;

  constructor(
    private alertController: AlertController,
    private productService: ProductService,
    private handleError: HandleError,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.checkScannerAvailability();
    this.loadFromStorage();
  }

  async checkScannerAvailability() {
    BarcodeScanner.isSupported().then(async (result) => {
      const isSupported = result.supported;
      const isCameraAvailable = await this.requestCameraPermission();
      this.isScannerAvailable = isSupported && isCameraAvailable;

      const isModuleAvailable = await this.requestModule();
      if (!isModuleAvailable) {
        await this.installModule();
      }
    });
  }

  async addProduct(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translateService.instant(
        'MULTI_SCAN.MODAL_HEADER_ADD_PRODUCT'
      ),
      inputs: [
        {
          name: 'barcode',
          type: 'text',
          placeholder: this.translateService.instant(
            'MULTI_SCAN.MODAL_INPUT_PLACEHOLDER'
          ),
        },
      ],
      buttons: [
        {
          text: this.translateService.instant('MULTI_SCAN.MODAL_CANCEL_BUTTON'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant(
            'MULTI_SCAN.MODAL_CONFIRM_BUTTON'
          ),
          handler: async (data) => {
            console.log(data);

            if (data.barcode) {
              // Fetch product details and add to the scanned products array
              await this.fetchProductDetails(data.barcode);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async scanBarcode(): Promise<void> {
    if (this.isScannerAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      await this.fetchProductDetails(barcode);
    }
  }

  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  private async requestModule(): Promise<boolean> {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  private async installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  private async fetchProductDetails(barcode: string): Promise<void> {
    console.log('Barcode:', barcode);

    try {
      const response = await this.productService.getProductByBarcode(barcode);
      // Add the scanned product object to the array
      if (response.status === 200) {
        this.scannedProducts.push(response.data);
        this.saveProductsInLocalStorage();
      }
    } catch (error: any) {
      this.handleError.handleError(
        error,
        'PRODUCT_DETAIL',
        'PRODUCT_NOT_FOUND',
        'ERROR_FETCHING_DETAILS'
      );
    }
  }

  loadFromStorage() {
    // Load saved products from local storage
    const savedProducts = localStorage.getItem('scannedProducts');
    if (savedProducts) {
      this.scannedProducts = JSON.parse(savedProducts);
    }
  }

  saveProductsInLocalStorage() {
    // Save the products in local storage
    localStorage.setItem(
      'scannedProducts',
      JSON.stringify(this.scannedProducts)
    );
  }

  saveToStorage() {
    // Save the products to local storage or perform your desired action
    console.log('Products saved to storage:', this.scannedProducts);
    // TODO: Implement the functionality to store the scanned products data.
    // Clear the scanned products array
    this.scannedProducts = [];
  }

  removeProduct(product: any) {
    // Remove the selected product from the array
    const index = this.scannedProducts.indexOf(product);
    if (index !== -1) {
      this.scannedProducts.splice(index, 1);
      this.saveProductsInLocalStorage();
    }
  }
}
