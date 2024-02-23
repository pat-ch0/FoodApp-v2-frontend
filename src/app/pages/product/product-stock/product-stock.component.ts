import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@type/products/product.type';
import { Quantity } from '@type/quantity.type';
import { StorageType } from '@type/storage.type';

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

  onDeleteProduct(product: (Product & Quantity)) {

  }

  onClickProduct(product: (Product & Quantity)) {

  }

  constructor(
    private route: ActivatedRoute,
    private routeNavigate: Router
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


}
