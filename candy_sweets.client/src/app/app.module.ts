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
import { AdminDashboardComponent } from './Suhaib/admin-dashboard/admin-dashboard.component';
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
import { ChatbotComponent } from './Suleiman/chatbot/chatbot.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ShoePageComponent,
    ProductDetailsComponent,
    CartPageComponent,
    AdminDashboardComponent,
    ManageProductComponent,
    ManageCategoriesComponent,
    NavBarComponent,
    FooterComponent,
    ChatbotComponent,
    
    
    
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditprofileComponent,
    ResetpasswordComponent,
    ForgetpasswordComponent,
    LaststageforgetpasswordComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
