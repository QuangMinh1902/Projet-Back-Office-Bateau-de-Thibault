import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';

const routes: Routes = [
  { path:'home', component : HomeComponent},
  { path: 'header', component : Headers},
  { path: 'detailsProduits', component : DetailsProduitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
