import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})
export class SearchTabPage implements OnInit{
 
  consoleOutput: string | null = null;  // TODO: Remove when implementing the navigation to product-detail
  productDetails: any = null; // TODO: Remove when implementing the navigation to product-detail

  isAvailable = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then(async (result) => {
      const isSupported = result.supported;
      const isCameraAvailable = await this._requestCameraPermission();
      const hasUserGavePermission = await this._requestUserPermissions();
      this.isAvailable = isSupported && isCameraAvailable;

      const isModuleAvailable = await this._requestModule();
      if (!isModuleAvailable) {
        await this._installModule();
        BarcodeScanner.addListener(
          'googleBarcodeScannerModuleInstallProgress',
          (event) => {
            event.progress;
            event.state;
          }
        );
      }
    });
  }

  searchProduct(event: any) {
    // Output the search value to the console and store it in the consoleOutput variable
    const barcode = event.detail.value;
    console.log(barcode);
    this.consoleOutput = `Search input changed: ${barcode}`;

    // TODO: Add navigation to product-detail with the barcode "product-detail/barcode"
    this.productService
      .searchProductByBarcode(barcode)
      .then((response) => {
        // Handle the successful response here
        console.log('Product search response:', response);
        this.consoleOutput = `Product details: ${JSON.stringify(
          response.data
        )}`;
      })
      .catch((error) => {
        // Handle the error here
        console.error('Product search failed:', error);
        this.consoleOutput = 'Product search failed';
      });
  }

  async scan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      // TODO: Add navigation to product-detail with the barcode "product-detail/barcode"
      this.productService
        .searchProductByBarcode(barcode)
        .then((response) => {
          // Handle the successful response here
          console.log('Product search response:', response);
          this.consoleOutput = `Product details: ${JSON.stringify(
            response.data
          )}`;
        })
        .catch((error) => {
          // Handle the error here
          console.error('Product search failed:', error);
          this.consoleOutput = 'Product search failed';
        });
    }
  }

  private async _requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  private async _requestUserPermissions(): Promise<void> {
    const permissions = await BarcodeScanner.requestPermissions();
  }

  private async _requestModule(): Promise<boolean> {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  private async _installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }
}
