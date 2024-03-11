import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@Service/product/product.service';
import { IonSelect, LoadingController, ModalController } from '@ionic/angular';
import { ProductDetail } from '@Type/products/product-detail.type';
import { HandleError } from '@Service/errors/handle-error.service';
import { ProductQuantityData } from '@Type/products/quantity.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Community } from '@Type/community/community.type';
import { StorageType } from '@Type/storage.type';
import { CommunityService } from '@Service/community/community.service';
import { StorageService } from '@Service/storage/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetail | undefined; // The product details to display.
  barcode: string | null = ''; // The barcode of the product to fetch.
  isLoading = false; // Indicates if the loading spinner should be shown.

  form: FormGroup = new FormGroup({
    community: new FormControl('', [Validators.required,]),
    storage: new FormControl('', [Validators.required,]),
  });

  communities: ({ community: Community; userRoleLabel: string })[] = [];
  storages: StorageType[] = [];
  @ViewChild('communitySelect') communitySelect!: IonSelect;
  selectedCommunity: any;
  selectedStorage: any;

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
    private handleError: HandleError,
    private communityService: CommunityService,
    private storageService: StorageService,
    private modalController: ModalController
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
    this.communities = await this.communityService.getCommunities();
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
      this.handleError.showToast(
        'PRODUCT_DETAIL.NO_BARCODE_PROVIDED',
        'warning'
      );
      return;
    }

    try {
      const response = await this.productService.getProductByBarcode(
        this.barcode
      );
      this.product = response.data;
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
   * Saves the scanned products to storage after selecting community and storage.
   * Opens a modal to select community and storage, then saves the products using the selected data.
   * Clears the scanned products array upon a successful save operation.
   * Handles errors and displays appropriate messages to the user.
   */
  async saveToStorage(communityId: string, storageId: string) {
    if (!this.product) return;
    const newProduct: ProductQuantityData = {
      barcode: this.product.barcode,
      name: this.product.name,
      imageSrc: this.product.imageSrc,
      quantity: 1,
    };
    // If either communityId or storageId is null, do nothing
    if (communityId === null || communityId === "" 
      || storageId === null || storageId === "") {
      return;
    }

    try {
      // Check if both communityId and storageId are available
      if (communityId && storageId) {
        console.log('Products saved to storage:', [newProduct]);

        // Save products in storage
        const res = await this.productService.saveProductsInStorage(
          communityId,
          storageId,
          [newProduct]
        );
        console.log(res);
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

  async getStoragesForCommunity() {
    const res = await this.storageService.getAllStorages(this.selectedCommunity);
    this.storages = res.data;
    console.log(this.storages);
  }

}
