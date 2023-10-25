import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public API_URL: string = 'http://127.0.0.1:8000';


  constructor(private http: HttpClient) { }

  /*getProductsFromJson(){
    return this.http.get<Product[]>("../../../assets/Products.json")
  }*/

  public getProductsFromJson(): Observable<Product[]> {
    console.log(this.http.get<Product[]>(this.API_URL + '/infoproducts/'));
    return this.http.get<Product[]>(this.API_URL + '/infoproducts/');
  }

  public updateProducts(products: Product[]): Observable<Product[]> {
    console.log(products);
    return this.http.put<Product[]>(this.API_URL + '/infoproducts/', products);
  }

  addProductStock(product:Product, n : number){
    return this.http.get<Product>(this.API_URL+'/incrementStock/'+product.id+'/'+n+'/');
  }

  removeProductStock(product:Product, n : number){
    return this.http.get<Product>(this.API_URL+'/decrementStock/'+product.id+'/'+Math.abs(n)+'/');
  }

  putOnSale(product:Product, salePrice : string){
    return this.http.get<Product>(this.API_URL+'/putonsale/'+product.id+'/'+salePrice+'/');
  }

}
