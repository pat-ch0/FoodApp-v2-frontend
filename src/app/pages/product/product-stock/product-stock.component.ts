import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@Type/products/product.type';
import { Quantity } from '@Type/quantity.type';
import { StorageType } from '@Type/storage.type';
import { AlertController } from '@ionic/angular';
import { ProductService } from '@Service/product/product.service';
import { HandleError } from '@Service/errors/handle-error.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
})
export class ProductStockComponent implements OnInit {
  addProductClick() {
    this.routeNavigate.navigate(['/tabs/search']);
  }

  onSearchProduct(textSearch: string | null | undefined) {
    if (textSearch == null || textSearch == '' || textSearch == undefined) {
      this.productsFilter = this.products;
      return;
    }
    this.productsFilter = this.products.filter((product) =>
      product.name.toLowerCase().includes(textSearch.toLowerCase())
    );
  }

  storage!: StorageType;
  loading: boolean = true;
  isEmpty = true;
  private products: (Product & Quantity)[] = [];
  productsFilter: (Product & Quantity)[] = [];

  async onDeleteProduct(product: Product & Quantity) {
    const alert = await this.alertController.create({
      header: `Delete ${product.name}`,
      message: `Are you sure you want to delete ${product.name} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.log('Yes button clicked');
            try {
              await this.productService.deleteProduct(product.barcode);
            } catch (error: any) {
              this.handleError.handleError(
                error,
                'PRODUCT_STOCK',
                'PRODUCT_NOT_FOUND',
                'ERROR_FETCHING_DETAILS'
              );
            }
          },
        },
        'No',
      ],
    });
    await alert.present();
  }

  onClickProduct(product: Product & Quantity) {}

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private routeNavigate: Router,
    private productService: ProductService,
    private handleError: HandleError
  ) {
    this.products.push({
      barcode: '123456789',
      name: 'Product 1',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 5,
    });

    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
    });
    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
    });
    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
    });
    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
    });
    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
    });
    this.products.push({
      barcode: '123456789',
      name: 'Product 3',
      imageSrc: 'https://via.placeholder.com/150',
      quantity: 3,
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
}
