import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})


export class DetailsProduitsComponent implements OnInit{

  listProduct : Product[] = [];
  listPoissons : Product[] = [];
  listFruits_de_Mer : Product[] = [];
  listCrustaces : Product[] = [];

  constructor(public productsServices : ProductsService){}

  getProducts(){
    this.productsServices.getProductsFromJson().subscribe((res : Product[]) => {
      this.listProduct = res;
      this.listPoissons = res.filter((product) => product.category === 0);
      this.listFruits_de_Mer = res.filter((product) => product.category === 1);
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

  getProduct(id : number) : Product | undefined{
    return this.listProduct.find((product) => product.id === id);
  }

  modifierStock(category : number, index: number) {
    let product = this.listProduct[index];
    if (category === 0) {
      product = this.listPoissons[index];
    } else if (category === 1){
      product = this.listFruits_de_Mer[index];
    } else {
      product = this.listCrustaces[index]
    }
    
    const quantiteModifie = product.nb_modifie;
    if (Math.abs(quantiteModifie) > product.quantity_stock && quantiteModifie < 0){
      alert("La quantité du produit dans le stock n'est pas suffisant");
    }else{
      // Mettre à jour le stock en fonction de la quantité ajoutée/enlevée
      product.quantity_stock += quantiteModifie;
    }
    // Réinitialiser la quantité à ajouter/enlever
    product.nb_modifie = 0;
  }


  modifierDiscount(category: number, index : number){
    let product = this.listProduct[index];
    if (category === 0) {
      product = this.listPoissons[index];
    } else if (category === 1){
      product = this.listFruits_de_Mer[index];
    } else {
      product = this.listCrustaces[index]
    }
    
    const discountModifie = product.discount_modifie;
    if (discountModifie < 0){
      alert("Le discount doit être supérieur à 0");
    }else{
      // Mettre à jour le stock en fonction de la quantité ajoutée/enlevée
      product.discount = discountModifie;
      product.price_on_sale = (product.price/100) * (100-product.discount)
    }
    // Réinitialiser la quantité à ajouter/enlever
    product.discount_modifie = 0;
  }


  envoyerDonnees(category : number, index : number){
    this.modifierStock(category, index);
    this.modifierDiscount(category, index);
  }
}


