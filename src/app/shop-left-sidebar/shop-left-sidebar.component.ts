import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/product.service';
import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shop-left-sidebar',
  templateUrl: './shop-left-sidebar.component.html',
  styleUrls: ['./shop-left-sidebar.component.css']
})
export class ShopLeftSidebarComponent implements OnInit {

  products : any[] = []
  categories : any[] = []
  rating : any[] = []
  isCategoryFilter = false ;
  isRatingFilter = false ;
  productsAfterFilter :any[] = []
  selectedCategories : any[] = []
  stars : any[] = []
  prices : any[] = []
  discount_offer : any[] = []
  randomProducts : any[] = []
  @ViewChild('form',{ static: true }) ngForm: NgForm;
  
  constructor(private productService: ProductService) {
    this.getAllproducts()
    this.allproductCategories()
    this.fillStarsArray()
    this.fillPricesArray()
    this.filldiscount_offerArray()
  }

  ngOnInit(): void {
    // this.ngForm.form.valueChanges.subscribe(x => {
    //   this.filterProducts()
    // })
  }
  getPriceWithDiscount(item:any){
    return item.price + ((item.discountPercentage * item.price)/100)
  }
  getNumberOfStars(item:any){
    return Math.floor(item.rating)
  }
  getNumberOfEmptyStars(item:any){
    return 5-Math.floor(item.rating)
  }
  fillStarsArray(){
    for (let index = 0; index < 5; index++) {
      this.stars.push({checked:false})
    }
  }
  filldiscount_offerArray(){
      this.discount_offer.push({max : 5 ,checked:false})
      this.discount_offer.push({max : 20 ,checked:false})
      this.discount_offer.push({max : 25 ,checked:false})
  }
  fillPricesArray(){
      this.prices.push({min:0,max : 150,checked:false})
      this.prices.push({min:150,max : 350,checked:false})
      this.prices.push({min:350,max : 450,checked:false})
      this.prices.push({min:450,max : 1000000000000000,checked:false})
  }
  getAllproducts(){
    this.productService.getAllProductsIllimited()
    .then(res =>res.json())
    .then((res)=>{
      this.products = res.products
      this.randomProducts = this.getTenRandomProducts()
    });
  }
  getTenRandomProducts(){
    let result :any[] = []
    for (let j = 0; j < 11; j++) {
      let id =  Math.floor(Math.random() * 100);
      let item = this.products.find(x=>x.id === id)
      let index = result.findIndex(x=>x.id == id)
      if (item && index == -1) {
        result.push(item)
      }
    }
    return result
  }
  allproductCategories(){
    this.productService.getAllProductCategories()
    .then(res=>res.json())
    .then((res)=>{
      this.categories = res
      this.categories.forEach(x=>{
        this.selectedCategories.push({value:x,checked:false})
      })
    })
  } 
  get selectedCategoriesList() { 
    return this.selectedCategories
              .filter(opt => opt.checked)
              .map(opt => opt.value)
  }
  get selectedStartsList() { 
    return this.stars
              .filter(opt => opt.checked)
  }
  filterProducts() {
      this.filterByCategory()
      //filter by rating 
      this.filterByRating()
      //filter by prices 
      this.filterByPrices()
      //filter by discount offer
      this.filterByDiscount()
  }
  filterByDiscount(){
    let temp = this.discount_offer.filter(x=>x.checked == true)
    let p_array = this.productsAfterFilter.length >0 ? this.productsAfterFilter : this.products
    if (temp.length > 0) {
      this.discount_offer.forEach((s,index)=>{
        p_array.forEach(p=>{
          if (s.checked && p.discountPercentage <= s.max) {
            let index  = this.productsAfterFilter.findIndex(r=>r.id == p.id)
            if (index == -1) {
              this.productsAfterFilter.push(p)
            }
          }else if(!s.checked){
            let jIndex = this.productsAfterFilter.findIndex(r=>s.id == r.id);
            if(jIndex>=0){
              this.productsAfterFilter.splice(index,1)
            }
          } else if(s.checked && p.discountPercentage > s.max){
            this.productsAfterFilter = this.productsAfterFilter.filter(r=>r.discountPercentage <= s.max)
          }
        })
      })
    }
  }
  filterByPrices(){
    let temp = this.prices.filter(x=>x.checked == true)
    let p_array = this.productsAfterFilter.length >0 ? this.productsAfterFilter : this.products
    if (temp.length > 0) {
      this.prices.forEach((s,index)=>{
        p_array.forEach(p=>{
          if (s.checked && p.price >= s.min && p.price<=s.max) {
            let index  = this.productsAfterFilter.findIndex(r=>r.id == p.id)
            if (index == -1) {
              this.productsAfterFilter.push(p)
            }
          }else if(!s.checked){
            let jIndex = this.productsAfterFilter.findIndex(r=>s.id == r.id);
            if(jIndex>=0){
              this.productsAfterFilter.splice(index,1)
            }
          }else if(s.checked && p.price < s.min || p.price>s.max){
            this.productsAfterFilter = this.productsAfterFilter.filter(r=>r.price >= s.min && r.price<=s.max)
          }
        })
      })
    }
  }
  filterByRating(){
    let temp = this.stars.filter(x=>x.checked == true)
    let p_array = this.productsAfterFilter.length >0 ? this.productsAfterFilter : this.products
    if (temp.length > 0) {
      this.stars.forEach((s,index)=>{
        p_array.forEach(p=>{
          if (s.checked && Math.floor(p.rating) === index+1) {
            let index  = this.productsAfterFilter.findIndex(r=>r.id == p.id)
            if (index == -1) {
              this.productsAfterFilter.push(p)
            }
          }else if(s.checked && Math.floor(p.rating) != index+1){
              this.productsAfterFilter = this.productsAfterFilter.filter(r=>Math.floor(r.rating) === index+1)
          }
        })
      })
    }
  }
  filterByCategory(){
    let p_array :any[] = []
    if (this.stars.filter(x=>x.checked === false).length == this.stars.length 
          && this.prices.filter(x=>x.checked === false).length == this.prices.length
          && this.discount_offer.filter(x=>x.checked === false).length == this.discount_offer.length) {
      p_array = this.products
    }else{
      p_array = this.productsAfterFilter
    }
    this.selectedCategories.forEach(x => {
      p_array.forEach(s => {
        if(s.category === x.value && !x.checked){// for remove items afted uncheck
          let index  = this.productsAfterFilter.findIndex(r=>r.id == s.id)
          if(index>=0){
            this.productsAfterFilter.splice(index,1)
          }
        }else if (x.checked && s.category === x.value) {// for add items after check
          let jIndex = this.productsAfterFilter.findIndex(r=>s.id == r.id);
          if (jIndex == -1) {
            this.productsAfterFilter.push(s)
          }
        }else if(s.checked && s.category != x.value){
          this.productsAfterFilter = this.productsAfterFilter.filter(r=>s.category === x.value)
        }
      })
    })
  }
  isFilterOff(){
    return       this.selectedCategories.filter(x=>x.checked === false).length == this.selectedCategories.length  &&
                this.stars.filter(x=>x.checked === false).length == this.stars.length 
                && this.prices.filter(x=>x.checked === false).length == this.prices.length
                && this.discount_offer.filter(x=>x.checked === false).length == this.discount_offer.length
  }

}
