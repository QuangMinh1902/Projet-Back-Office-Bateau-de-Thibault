import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product';
import { Transaction } from 'src/app/models/transaction';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  infoProduct : Product[] = []
  transactions : Transaction[] = []
  dataChart : any[] =[]
  chart : any

  constructor(public productsServices : ProductsService){}

  getTransaction(){
    this.productsServices.getTransaction().subscribe((res : Transaction[]) => {
      this.transactions = res;
      console.log(res)
      this.createChart()
    },
    (err) => {
      alert('failed loading json data transaction');
    }
    )
  }

  getTransaction_Month(id : number){
    this.productsServices.getTransaction_Month(id).subscribe((res : Transaction[]) => {
      this.transactions = res;
      console.log(res)
    },
    (err) => {
      alert('failed loading json data transaction_month');
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
    return Math.round(res*100)/100;
  }




  ngOnDestroy(): void {
    // Détruire le graphique lorsque le composant est détruit pour éviter les erreurs
    if (this.chart) {
      this.chart.destroy();
    }
  }


  createChart(){
    if (this.chart) {
      this.chart.destroy(); // Détruire le graphique existant s'il y en a un
    }

    const transactionsPoissons = this.transactions.filter(transaction => transaction.category === 0);
    const poissons_ventesParMois = Array(12).fill(0);
    for (const transaction of transactionsPoissons) {
      const mois = new Date(transaction.selling_date.toString()).getMonth();
      poissons_ventesParMois[mois] += transaction.selling_quantity;
    }
    console.log("poissons list hello "+poissons_ventesParMois)

    const transactionsMer = this.transactions.filter(transaction => transaction.category === 1);
    const mer_ventesParMois = Array(12).fill(0);
    for (const transaction of transactionsMer) {
      const mois = new Date(transaction.selling_date.toString()).getMonth();
      console.log("mois: " + mois)
      mer_ventesParMois[mois] += transaction.selling_quantity;
    }
    console.log("mer list hello "+mer_ventesParMois);

    const transactionsCrustaces = this.transactions.filter(transaction => transaction.category === 2);
    const crustaces_ventesParMois = Array(12).fill(0);
    for (const transaction of transactionsCrustaces) {
      const mois = new Date(transaction.selling_date.toString()).getMonth();
      crustaces_ventesParMois[mois] += transaction.selling_quantity;
    }
    console.log("abc list hello "+crustaces_ventesParMois);

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['janvier', 'février', 'mars','avril',
								 'mai', 'june', 'juillet','août','septembre','octobre','novembre','décembre'],
	       datasets: [
          {
            label: "Poissons",
            data: poissons_ventesParMois,
            backgroundColor: 'blue'
          },
          {
            label: "Fruits de Mer",
            data: mer_ventesParMois,
            backgroundColor: 'red'
          } ,
          {
            label: "Crustacés",
            data: crustaces_ventesParMois,
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  // Pie Chart
  chartOptions = {
	  animationEnabled: true,
	  title: {
		text: "Sales by Department"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 14.1, name: "Toys" },
		  { y: 28.2, name: "Electronics" },
		  { y: 14.4, name: "Groceries" },
		  { y: 43.3, name: "Furniture" }
		]
	  }]
	}

 

}
