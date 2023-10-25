import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';
import { PoissonsComponent } from './pages/poissons/poissons.component';
import { FruitsdemerComponent } from './pages/fruitsdemer/fruitsdemer.component';
import { CrustacesComponent } from './pages/crustaces/crustaces.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path:'home', component : HomeComponent},
  { path: 'header', component : Headers},
  { path: 'detailsProduits', component : DetailsProduitsComponent},

  { path: 'fruitsdemer', component : FruitsdemerComponent},
  { path: 'crustaces', component : CrustacesComponent},
  { path: 'poissons', component : PoissonsComponent},
  { path: 'dashboard', component : DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
