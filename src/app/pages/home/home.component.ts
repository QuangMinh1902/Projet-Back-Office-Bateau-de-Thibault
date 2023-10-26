import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  infoProduct : Product[] = []
  transactions : Transaction[] = []
  dataChart : any[] =[]


  constructor(public productsServices : ProductsService){}

  getTransaction(){
    this.productsServices.getTransaction().subscribe((res : Transaction[]) => {
      this.transactions = res;
      console.log(res)
    },
    (err) => {
      alert('failed loading json data transaction');
    }
    )
  }

  

  getProducts(){
    this.productsServices.getProductsFromJson().subscribe((res : Product[]) => {
      this.infoProduct = res
    },
    (err) => {
      alert('failed loading json data poisson');
    }
    )
  }

  ngOnInit(): void {
      this.getTransaction();
      this.getProducts();
  }


  getQuantityInStock(category : number){
    //let total_quantity = this.infoProduct.reduce((acc, product) => acc + product.quantityInStock, 0);
    let total_quantity = this.infoProduct
    .filter(product => product.category === category)
    .reduce((acc, product) => acc + product.quantityInStock, 0);
    return total_quantity;
  }

  getTotalPromotion(category : number){
    let res = this.infoProduct.filter(product => product.sale === true && product.category === category).length;
    return res;
  }


  getTotalVendu(category : number){
    let count = 0;
    for (const transaction of this.transactions) {
      if (transaction.category === category && transaction.amount_total > 0) {
        count += transaction.selling_quantity;
      }
    }
    return count;
  }

  getAmountTotal(category : number){
    let res = this.transactions
    .filter(t => t.category === category)
    .reduce((acc, t) => acc + t.amount_total, 0);
    return res;
  }

  calculDataChart(){
    let dataChart = [
      {name: "Poissons", y : this.getAmountTotal(0)},
      {name: "Fruits de mer", y : this.getAmountTotal(1)},
      {name: "Crustacés", y : this.getAmountTotal(2)},
    ]
    console.log("hello");
    console.log(dataChart)
    return dataChart;
  }
}
