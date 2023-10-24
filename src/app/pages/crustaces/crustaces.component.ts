import { Component } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-crustaces',
  templateUrl: './crustaces.component.html',
  styleUrls: ['./crustaces.component.css']
})
export class CrustacesComponent {

  listCrustaces: Product[] = [];
  nom = "Liste de Crustacés"

  constructor(public productsServices : ProductsService){}

  getProducts(){
    this.productsServices.getProductsFromJson().subscribe((res : Product[]) => {
      this.listCrustaces = res.filter((product) => product.category === 2);
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

