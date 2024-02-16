import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) { }

  async searchProductByBarcode(barcode: string): Promise<any> {
    return this.apiService.get(`${environment.config.product.endpoint}${barcode}`);
  }
}
