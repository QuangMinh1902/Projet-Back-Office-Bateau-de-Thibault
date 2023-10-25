import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})




export class DetailsProduitsComponent {

  @Input() product: Product[] = [];
  @Input() name: string = "";


  constructor(public productsServices : ProductsService){}



  modifierStock(index: number) {
    let product = this.product[index];

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


  modifierDiscount(index : number){
    let product = this.product[index];

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

  envoyerDonnees(index : number){
    this.modifierStock(index);
    this.modifierDiscount(index);
  }

  checkInput(name: string, index: number) {
    const input = document.getElementById(name) as HTMLInputElement;

    if (input) {
      const inputValue = parseInt(input.value, 10);

      const errorTag = document.querySelector(`input[id='${name}'] + p`) as HTMLElement | null;
      const envoyerButton = document.querySelector(`input[id='${name}'] + p + button`) as HTMLButtonElement | null;

      if (inputValue < 0 && Math.abs(inputValue) > this.product[index].quantity_stock) {
        if (errorTag) {
          errorTag.style.color = "red";
          errorTag.innerHTML = "Le nombre à enlever est plus grand que celui en stock";
          input.classList.add("red-border");
        }

        if (envoyerButton) {
          envoyerButton.disabled = true;
        }
      } else {
        if (errorTag) {
          errorTag.style.color = "initial";
          errorTag.innerHTML = "";
        }
        input.classList.remove("red-border");

        if (envoyerButton) {
          envoyerButton.disabled = false;
        }
      }
    }
  }










}


