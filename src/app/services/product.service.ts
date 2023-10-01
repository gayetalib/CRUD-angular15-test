import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = environment.host + "/products";

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getSelectedProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + "?selected=true");
  }

  getAvailableProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + "?available=true");
  }

  getSearchProducts(value:string): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + "?name_like=" + value);
  }

  selectProduct(product:Product): Observable<Product>{
    product.selected = ! product.selected;
    return this.http.put<Product>(this.url + "/" + product.id, product);
  }

  deleteProduct(product:Product): Observable<void>{
    return this.http.delete<void>(this.url + "/" + product.id);
  }

  saveProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(this.url, product);
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(this.url + "/" + id);
  }

  editProduct(id:number, product:Product): Observable<Product>{
    return this.http.put<Product>(this.url + "/" + id, product);
  }
}
