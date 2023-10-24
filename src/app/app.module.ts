import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';
import { ProductsService } from './core/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PoissonsComponent } from './pages/poissons/poissons.component';
import { FruitsdemerComponent } from './pages/fruitsdemer/fruitsdemer.component';
import { CrustacesComponent } from './pages/crustaces/crustaces.component';
import { NavbarComponent } from './features/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsProduitsComponent,
    HeaderComponent,
    FooterComponent,
    DetailsProduitsComponent,
    PoissonsComponent,
    FruitsdemerComponent,
    CrustacesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
