import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products : any[] = []
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
 
  getAllProducts(){
    this.productService.getAllProducts()
        .then(res=>res.json())
        .then((res=>{
          this.products = res.products
        }))
  }
  getPriceWithDiscount(item:any){
    return item.price + ((item.discountPercentage * item.price)/100)
  }

}
