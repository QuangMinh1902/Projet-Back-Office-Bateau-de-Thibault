import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{


  infoProduct : Product[] = []
  transactions : Transaction[] = []
  categories = ["Poissons","Fruits de Mer","Crustacés"]

  constructor(public productsServices : ProductsService){}


  getTransaction(){
    this.productsServices.getTransaction().subscribe((res : Transaction[]) => {
      this.transactions = res;
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
      alert('failed loading json data infoProduct');
    }
    )
  }

  getNameProduct(id : number){
    let name = ""
    for (const product of this.infoProduct) {
      if (product.id === id) {
          name = product.name;
          break;
      }
    }
    return name;
  }

  ngOnInit(): void {
      this.getTransaction();
      this.getProducts();
  }

  getNameCategory(id : number){
    return this.categories[id]
  }


  
}
