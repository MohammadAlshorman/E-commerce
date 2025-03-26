import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Omar/landing-page/landing-page.component';
import { ShoePageComponent } from './Mohammad/shoe-page/shoe-page.component';
import { ProductDetailsComponent } from './Suleiman/product-details/product-details.component';
import { CartPageComponent } from './Sofyan/cart-page/cart-page.component';
import { AdminDashboardComponent } from './Suhaib/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './Ahmad/manage-products/manage-products.component';
import { ManageCategoriesComponent } from './Abdallah/manage-categories/manage-categories.component';
import { NavBarComponent } from './Mohammad/nav-bar/nav-bar.component';
import { FooterComponent } from './Mohammad/footer/footer.component';
import { HomeComponent } from './Mohammad/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ShoePageComponent,
    ProductDetailsComponent,
    CartPageComponent,
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageCategoriesComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
