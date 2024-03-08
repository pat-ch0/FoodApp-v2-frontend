import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ProductService } from '@Service/product/product.service';
import { HandleError } from '@Service/errors/handle-error.service';
import { ProductDetail } from '@Type/products/product-detail.type';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component for multi-scan functionality.
 */
@Component({
  selector: 'app-multi-scan',
  templateUrl: './multi-scan.component.html',
  styleUrls: ['./multi-scan.component.scss'],
})
export class MultiScanComponent implements OnInit {
  /**
   * Array to store scanned product details.
   */
  scannedProducts: ProductDetail[] = [];

  /**
   * Flag to indicate if the scanner is available.
   */
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

  /**
   * Checks the availability of the scanner and camera.
   * If the scanner or camera is not available, it prompts the user to install or enable them.
   */
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

  /**
   * Opens a modal to add a product by entering its barcode.
   * If a barcode is provided, it fetches the product details and adds them to the scanned products array.
   */
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
              await this.fetchProductDetails(data.barcode);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Scans a barcode using the scanner and fetches the product details.
   * If the scanner is not available, it does nothing.
   */
  async scanBarcode(): Promise<void> {
    if (this.isScannerAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      await this.fetchProductDetails(barcode);
    }
  }

  /**
   * Requests camera permission and returns a boolean indicating if the permission is granted.
   */
  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  /**
   * Checks if the Google Barcode Scanner module is available and returns a boolean indicating its availability.
   */
  private async requestModule(): Promise<boolean> {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  /**
   * Installs the Google Barcode Scanner module.
   */
  private async installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  /**
   * Fetches the product details for the given barcode and adds them to the scanned products array.
   * If an error occurs, it handles the error and displays an appropriate message.
   * @param barcode - The barcode of the product.
   */
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

  /**
   * Loads saved products from local storage.
   */
  loadFromStorage() {
    const savedProducts = localStorage.getItem('scannedProducts');
    if (savedProducts) {
      this.scannedProducts = JSON.parse(savedProducts);
    }
  }

  /**
   * Saves the products in local storage.
   */
  saveProductsInLocalStorage() {
    localStorage.setItem(
      'scannedProducts',
      JSON.stringify(this.scannedProducts)
    );
  }

  /**
   * Saves the products to local storage or performs the desired action.
   * Clears the scanned products array.
   */
  saveToStorage() {
    console.log('Products saved to storage:', this.scannedProducts);
    // TODO: Implement the functionality to store the scanned products data.
    // Clear the scanned products array
    this.scannedProducts = [];
  }

  /**
   * Removes the selected product from the scanned products array.
   * @param product - The product to be removed.
   */
  removeProduct(product: any) {
    const index = this.scannedProducts.indexOf(product);
    if (index !== -1) {
      this.scannedProducts.splice(index, 1);
      this.saveProductsInLocalStorage();
    }
  }
}
