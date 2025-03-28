import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Omar/landing-page/landing-page.component';
import { ShoePageComponent } from './Mohammad/shoe-page/shoe-page.component';
import { ProductDetailsComponent } from './Suleiman/product-details/product-details.component';
import { CartPageComponent } from './Sofyan/cart-page/cart-page.component';
import { ManageCategoriesComponent } from './Abdallah/manage-categories/manage-categories.component';
import { ManageProductComponent } from './Ahmad/manage-product/manage-product.component';
import { NavBarComponent } from './Mohammad/nav-bar/nav-bar.component';
import { FooterComponent } from './Mohammad/footer/footer.component';
import { LoginComponent } from './Omar/login/login.component';
import { RegisterComponent } from './Omar/register/register.component';
import { ProfileComponent } from './Omar/profile/profile.component';
import { EditprofileComponent } from './Omar/editprofile/editprofile.component';
import { ResetpasswordComponent } from './Omar/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './Omar/forgetpassword/forgetpassword.component';
import { LaststageforgetpasswordComponent } from './Omar/laststageforgetpassword/laststageforgetpassword.component';
import { AddCategorieComponent } from './Abdallah/manage-categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './Abdallah/manage-categories/edit-categorie/edit-categorie.component';
import { GetUsersComponent } from './Abdallah/manage-categories/get-users/get-users.component';
import { ChatbotComponent } from './Suleiman/chatbot/chatbot.component';
import { CategoryComponent } from './Suleiman/category/category.component';
import { ProductsComponent } from './Suleiman/products/products.component';
import { DashboardComponent } from './Ahmad/admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ShoePageComponent,
    ProductDetailsComponent,
    CartPageComponent,
    ManageProductComponent,
    ManageCategoriesComponent,
    NavBarComponent,
    FooterComponent,
    ChatbotComponent,
    
    
    ManageProductComponent,
    ManageCategoriesComponent,
    
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditprofileComponent,
    ResetpasswordComponent,
    ForgetpasswordComponent,
    LaststageforgetpasswordComponent,
    AddCategorieComponent,
    EditCategorieComponent,
    GetUsersComponent,
    CategoryComponent,
    ProductsComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
