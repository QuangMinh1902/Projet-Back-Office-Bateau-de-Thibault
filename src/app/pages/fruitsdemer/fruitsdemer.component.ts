import { Component } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-fruitsdemer',
  templateUrl: './fruitsdemer.component.html',
  styleUrls: ['./fruitsdemer.component.css']
})
export class FruitsdemerComponent {

  listFruitsdeMer : Product[] = [];
  nom = "Liste de Fruits de Mer"

  constructor(public productsServices : ProductsService){}

  getProducts(){
    this.productsServices.getProductsFromJson().subscribe((res : Product[]) => {
      this.listFruitsdeMer = res.filter((product) => product.category === 1);
    },
    (err) => {
      alert('failed loading json data');
    }
    )
  }

  ngOnInit(): void {
      this.getProducts();
  }

  
}
