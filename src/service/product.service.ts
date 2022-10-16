import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  getAllProducts(){
    return fetch('https://dummyjson.com/products/?limit=15')
  }
  getAllProductsIllimited(){
    return fetch('https://dummyjson.com/products/?limit=1000')
  }
  getAllProductCategories(){
    return fetch('https://dummyjson.com/products/categories')
  }
}
