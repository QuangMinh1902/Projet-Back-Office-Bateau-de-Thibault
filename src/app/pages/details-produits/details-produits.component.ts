import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css'],
})
export class DetailsProduitsComponent implements OnInit {
  @Input() product: Product[] = [];
  @Input() name: string = '';
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    };
  }

  constructor(public productsServices: ProductsService) {}

  modifierStock(index: number) {
    let product = this.product[index];

    const quantiteModifie = product.nb_modifie;
    if (
      Math.abs(quantiteModifie) > product.quantityInStock &&
      quantiteModifie < 0
    ) {
      alert("La quantité du produit dans le stock n'est pas suffisant");
    } else {
      if (quantiteModifie != 0) {
        product.quantityInStock += quantiteModifie;
        this.product[index] = product;
        // this.dtTrigger.next(null);
        if (quantiteModifie > 0) {

          this.productsServices
            .addProductStock(product, quantiteModifie)
            .subscribe(
              (res: any) => {
                //console.log(res)
              },
              (err) => {
                alert('failed loading addProductStock');
              }
              );
        } else {
          this.productsServices
            .removeProductStock(product, quantiteModifie)
            .subscribe(
              (res: any) => {
                //console.log(res)
              },
              (err) => {
                alert('failed loading removeProductStock');
              }
            );
        }
      } else {
        alert('Valeur null');
      }
    }
    product.nb_modifie = 0;
  }

  modifierDiscount(index: number) {
    let product = this.product[index];
    const discountModifie = product.discount_modifie;
    console.log('discount' + discountModifie);
    console.log('prix' + product.price);
    if (discountModifie < 0) {
      alert('Le discount doit être supérieur à 0');
    } else if (discountModifie >= product.price && discountModifie > 0) {
      alert('Le discount doit être inférieur eu prix actuel');
    } else if (discountModifie == 0) {
      product.discount = 0;
      this.productsServices.removeSale(product).subscribe(
        (res: any) => {
          //console.log(res)
        },
        (err) => {
          alert('failed loading removeSale');
        }
      );
    } else {
      product.discount = discountModifie;
      this.productsServices.putOnSale(product, discountModifie).subscribe(
        (res: any) => {
          //console.log(res)
        },
        (err) => {
          alert('failed loading putOnSale');
        }
      );
    }
    // Réinitialiser la quantité à ajouter/enlever
    product.discount_modifie = 0;
  }

  envoyerDonnees(index: number) {
    this.modifierStock(index);
    this.modifierDiscount(index);
  }

  checkInput(name: string, index: number) {
    const input = document.getElementById(name) as HTMLInputElement;

    if (input) {
      const inputValue = parseInt(input.value, 10);

      const errorTag = document.querySelector(
        `input[id='${name}'] + p`
      ) as HTMLElement | null;
      const envoyerButton = document.querySelector(
        `input[id='${name}'] + p + button`
      ) as HTMLButtonElement | null;

      if (
        inputValue < 0 &&
        Math.abs(inputValue) > this.product[index].quantityInStock
      ) {
        if (errorTag) {
          errorTag.style.color = 'red';
          errorTag.innerHTML =
            'Le nombre à enlever est plus grand que celui en stock';
          input.classList.add('red-border');
        }

        if (envoyerButton) {
          envoyerButton.disabled = true;
        }
      } else {
        if (errorTag) {
          errorTag.style.color = 'initial';
          errorTag.innerHTML = '';
        }
        input.classList.remove('red-border');

        if (envoyerButton) {
          envoyerButton.disabled = false;
        }
      }
    }
  }

  checkInputStock(name: string, index: number){
    const input = document.getElementById(name) as HTMLInputElement;
    console.log(input)
    if (input) {
      const inputValue = parseInt(input.value, 10);

      const errorTag = document.querySelector(
        `input[id='${name}'] + p`
      ) as HTMLElement | null;
      const envoyerButton = document.querySelector(
        `input[id='${name}'] + p + button`
      ) as HTMLButtonElement | null;

      if (
        inputValue < 0 ||
        Math.abs(inputValue) > this.product[index].price
      ) {
        if (errorTag) {
          errorTag.style.color = 'red';
          errorTag.innerHTML =
            'Le nombre à enlever est plus grand que celui en stock';
          input.classList.add('red-border');
        }

        if (envoyerButton) {
          envoyerButton.disabled = true;
        }
      } else {
        if (errorTag) {
          errorTag.style.color = 'initial';
          errorTag.innerHTML = '';
        }
        input.classList.remove('red-border');

        if (envoyerButton) {
          envoyerButton.disabled = false;
        }
      }
    }
  }

}
