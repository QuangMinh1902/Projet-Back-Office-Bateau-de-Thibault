import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-poissons',
  templateUrl: './poissons.component.html',
  styleUrls: ['./poissons.component.css']
})
export class PoissonsComponent implements OnInit {


  listPoissons : Product[] = [];
  nom = "Liste de Poissons"

  constructor(public productsServices : ProductsService){}

  getProducts(){
    this.productsServices.getProductsFromJson().subscribe((res : Product[]) => {
      this.listPoissons = res.filter((product) => product.category === 0);
    },
    (err) => {
      alert('failed loading json data poisson');
    }
    )
  }

  ngOnInit(): void {
      this.getProducts();
  }

  
}
