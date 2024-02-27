import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@type/products/product.type';
import { Quantity } from '@type/quantity.type';
import { StorageType } from '@type/storage.type';
import { AlertController, ToastController } from '@ionic/angular'
import { ProductService } from '@service/product/product.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
})

export class ProductStockComponent implements OnInit {
  addProductClick() {
    this.routeNavigate.navigate(["/tabs/search"]);
  }


  onSearchProduct(textSearch: string | null | undefined) {
    if (textSearch == null || textSearch == "" || textSearch == undefined) {
      this.productsFilter = this.products;
      return;
    }
    this.productsFilter = this.products.filter(product => product.name.toLowerCase().includes(textSearch.toLowerCase()));
  }


  storage!: StorageType;
  loading: boolean = true;
  isEmpty = true;
  private products: (Product & Quantity)[] = [];
  productsFilter: (Product & Quantity)[] = [];

  async onDeleteProduct(product: (Product & Quantity)) {
    const alert = await this.alertController.create({
      header: `Delete ${product.name}`,
      message: `Are you sure you want to delete ${product.name} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.log('Yes button clicked');
            try {
              await this.productService.deleteProduct(product.barcode)
            }
            catch (error: any) {
              this.handleError(error)
            }
          }
        }, 'No'
      ],
    });
    await alert.present();
  }

  onClickProduct(product: (Product & Quantity)) {

  }

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private routeNavigate: Router,
    private productService: ProductService,
    private toastController: ToastController,
    private translate: TranslateService
    ) {
    this.products.push({
      barcode: "123456789",
      name: "Product 1",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 5
    });

    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });
    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });
    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });
    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });
    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });
    this.products.push({
      barcode: "123456789",
      name: "Product 3",
      imageSrc: "https://via.placeholder.com/150",
      quantity: 3
    });

    this.productsFilter = [...this.products];
  }


  ngOnInit(): void {
    if (this.route.snapshot.queryParams == null) {
      this.isEmpty = true;
      this.loading = false;
      return;
    }
    this.loading = false;
    this.isEmpty = false;
    this.storage = this.route.snapshot.queryParams! as StorageType;
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

  /**
   * Handles errors during product fetching.
   * @param error - The error object received.
   */
  private handleError(error: any) {
    const messageKey =
      error.status === 404
        ? 'PRODUCT_STOCK.PRODUCT_NOT_FOUND'
        : 'PRODUCT_STOCK.ERROR_FETCHING_DETAILS';
    this.showToast(messageKey, 'warning');
  }

}
