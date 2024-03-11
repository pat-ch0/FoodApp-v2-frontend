import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSelect, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ProductService } from '@Service/product/product.service';
import { HandleError } from '@Service/errors/handle-error.service';
import { TranslateService } from '@ngx-translate/core';
import { CommunityService } from '@Service/community/community.service';
import { StorageService } from '@Service/storage/storage.service';
import { ProductQuantityData } from '@Type/products/quantity.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Community } from '@Type/community/community.type';
import { StorageType } from '@Type/storage.type';

/**
 * Component for multi-scan functionality.
 */
@Component({
  selector: 'app-multi-scan',
  templateUrl: './multi-scan.component.html',
  styleUrls: ['./multi-scan.component.scss'],
})
export class MultiScanComponent implements OnInit {
  scannedProducts: Array<ProductQuantityData> = [];
  isScannerAvailable = false;
  form: FormGroup = new FormGroup({
    community: new FormControl('', [Validators.required,]),
    storage: new FormControl('', [Validators.required,]),
  });

  communities: ({ community: Community; userRoleLabel: string })[] = [];
  storages: StorageType[] = [];
  @ViewChild('communitySelect') communitySelect!: IonSelect;
  selectedCommunity: any;
  selectedStorage: any;
  
  constructor(
    private alertController: AlertController,
    private productService: ProductService,
    private handleError: HandleError,
    private translateService: TranslateService,
    private modalController: ModalController,
    private communityService: CommunityService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    this.checkScannerAvailability();
    this.loadFromStorage();
    this.communities = await this.communityService.getCommunities();
  }

  async getStoragesForCommunity() {
    const res = await this.storageService.getAllStorages(this.selectedCommunity);
    this.storages = res.data;
    console.log(this.storages);
  }

  /**
   * Checks the availability of the barcode scanner.
   * Updates the 'isScannerAvailable' property based on whether the scanner is supported and the camera is available.
   * If the required module is not available, it installs it.
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
   * Opens an alert to add a product by entering a barcode.
   * Fetches product details and adds them to the scanned products array.
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
   * Initiates the barcode scanning process if the scanner is available.
   * Fetches product details using the scanned barcode and adds them to the scanned products array.
   */
  async scanBarcode(): Promise<void> {
    if (this.isScannerAvailable) {
      const { barcodes } = await BarcodeScanner.scan();
      const barcode = barcodes[0].rawValue;
      await this.fetchProductDetails(barcode);
    }
  }

  /**
   * Requests camera permission and returns a boolean indicating whether it is granted.
   */
  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  /**
   * Requests the availability of the Google Barcode Scanner module and returns a boolean indicating its availability.
   */
  private async requestModule(): Promise<boolean> {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  /**
   * Installs the Google Barcode Scanner module.
   */
  /**
   * Installs the Google Barcode Scanner module.
   */
  private async installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  /**
   * Fetches product details using the provided barcode and adds the scanned product to the array.
   * Saves the scanned product in local storage upon a successful fetch operation.
   * Handles errors and displays appropriate messages to the user.
   *
   * @param barcode The barcode used to fetch product details.
   */
  private async fetchProductDetails(barcode: string): Promise<void> {
    try {
      const response = await this.productService.getProductByBarcode(barcode);
      const product: ProductQuantityData = {
        barcode: response.data.barcode,
        name: response.data.name,
        imageSrc: response.data.imageSrc,
        quantity: response.data.quantity || 0,
      };

      // Add the scanned product object to the array
      if (response.status === 200) {
        this.scannedProducts.push(product);
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
   * Loads saved products from local storage and updates the scanned products array.
   */
  loadFromStorage() {
    const savedProducts = localStorage.getItem('scannedProducts');
    if (savedProducts) {
      this.scannedProducts = JSON.parse(savedProducts);
    }
  }

  /**
   * Saves the products in the local storage.
   * Converts the scanned products array to JSON and stores it with the key 'scannedProducts'.
   */
  saveProductsInLocalStorage() {
    localStorage.setItem(
      'scannedProducts',
      JSON.stringify(this.scannedProducts)
    );
  }

  /**
   * Saves the scanned products to storage after selecting community and storage.
   * Opens a modal to select community and storage, then saves the products using the selected data.
   * Clears the scanned products array upon a successful save operation.
   * Handles errors and displays appropriate messages to the user.
   */
  async saveToStorage(communityId: string, storageId: string) {

    // If either communityId or storageId is null, do nothing
    if (communityId === null || communityId === "" 
      || storageId === null || storageId === "") {
      return;
    }

    try {
      // Check if both communityId and storageId are available
      if (communityId && storageId) {
        console.log('Products saved to storage:', this.scannedProducts);

        // Save products in storage
        const res = await this.productService.saveProductsInStorage(
          communityId,
          storageId,
          this.scannedProducts
        );
        console.log(res);

        // Check if the save operation was successful (status code 200)
        if (res.status === 200) {
          // Clear the scanned products array
          this.scannedProducts = [];
          this.saveProductsInLocalStorage();
        } else {
          // Handle the case where the save operation failed
          console.error('Failed to save products:', res);
          // Optionally, display an error message to the user
        }
      } else {
        // Handle the case where either communityId or storageId is not available
        console.error('CommunityId or StorageId is missing.');
        // Optionally, display an error message to the user
      }
    } catch (error) {
      // Handle any unexpected errors that may occur during the process
      console.error('An error occurred during the save operation:', error);
      // Optionally, display an error message to the user
    }
  }


  /**
   * Handles the submission of the community and storage selection form.
   * Closes the modal and provides the selected community and storage data.
   *
   * @param formData The data submitted from the form (selected community and storage).
   */
  async handleFormSubmit() {
    console.log(this.form.value);
    this.modalController.dismiss();
    this.saveToStorage(this.selectedCommunity, this.selectedStorage);
  }

  /**
   * Removes the selected product from the scanned products array.
   *
   * @param product The product to be removed.
   */
  removeProduct(product: ProductQuantityData) {
    // Remove the selected product from the array
    const index = this.scannedProducts.indexOf(product);
    if (index !== -1) {
      this.scannedProducts.splice(index, 1);
      this.saveProductsInLocalStorage();
    }
  }

  /**
   * Increments the quantity of the selected product by 1.
   *
   * @param product The product whose quantity is to be incremented.
   */
  incrementQuantity(product: ProductQuantityData): void {
    product.quantity = (product.quantity || 0) + 1;
    this.saveProductsInLocalStorage();
  }

  /**
   * Decrements the quantity of the selected product by 1.
   * Ensures that quantity is a non-negative integer.
   *
   * @param product The product whose quantity is to be decremented.
   */
  decrementQuantity(product: ProductQuantityData): void {
    // Ensure that quantity is a non-negative integer
    product.quantity = Math.max(0, product.quantity - 1);
    this.saveProductsInLocalStorage();
  }

  /**
   * Validates and ensures that the quantity input for a product is a non-negative integer.
   *
   * @param product The product whose quantity input is to be validated.
   */
  validateQuantityInput(product: ProductQuantityData): void {
    // Ensure that quantity is a non-negative integer
    product.quantity = Math.max(0, Math.floor(product.quantity));
    this.saveProductsInLocalStorage();
  }

  /**
   * Validates whether the scanned products array has valid quantities for all products.
   * Returns true if all products have a quantity greater than 0, false otherwise.
   *
   * @returns True if all products have valid quantities, false otherwise.
   */
  validateSave(): boolean {
    if (this.scannedProducts.length === 0) {
      return false;
    }

    const hasValidQuantity = this.scannedProducts.every(
      (product) => product.quantity > 0
    );

    if (!hasValidQuantity) {
      return false;
    }

    return true;
  }
}
