import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})
export class SearchTabPage implements OnInit {
  isAvailable = true;
  
  constructor(private router: Router) {}

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
    const barcode = event.detail.value;
    console.log(`Search input changed: ${barcode}`);
  
    // Navigate to product-detail with the barcode
    this.router.navigate([`product-detail/${barcode}`])
  }

  async scan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      console.log('Scanned barcode:', barcode);

      // Navigate to product-detail with the barcode
      this.router.navigate([`product-detail/${barcode}`]);
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
