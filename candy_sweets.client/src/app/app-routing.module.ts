import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Mohammad/home/home.component';
import { EditprofileComponent } from './Omar/editprofile/editprofile.component';
import { ForgetpasswordComponent } from './Omar/forgetpassword/forgetpassword.component';
import { LandingPageComponent } from './Omar/landing-page/landing-page.component';
import { LaststageforgetpasswordComponent } from './Omar/laststageforgetpassword/laststageforgetpassword.component';
import { LoginComponent } from './Omar/login/login.component';
import { ProfileComponent } from './Omar/profile/profile.component';
import { RegisterComponent } from './Omar/register/register.component';
import { ResetpasswordComponent } from './Omar/resetpassword/resetpassword.component';
import { ManageCategoriesComponent } from './Abdallah/manage-categories/manage-categories.component';
import { AddCategorieComponent } from './Abdallah/manage-categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './Abdallah/manage-categories/edit-categorie/edit-categorie.component';
import { GetUsersComponent } from './Abdallah/manage-categories/get-users/get-users.component';
import { CategoryComponent } from './Suleiman/category/category.component';
import { ProductsComponent } from './Suleiman/products/products.component';
import { ProductDetailsComponent } from './Suleiman/product-details/product-details.component';
import { ManageProductComponent } from './Ahmad/manage-product/manage-product.component';
import { DashboardComponent } from './Ahmad/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './Suleiman/cart/cart.component';
import { CheckoutComponent } from './Suleiman/checkout/checkout.component';
import { AboutAsComponent } from './Mohammad/about-as/about-as.component';
import { OurTeamComponent } from './Mohammad/our-team/our-team.component';
import { TestimonialsComponent } from './Mohammad/testimonials/testimonials.component';
import { ContactusComponent } from './Mohammad/contactus/contactus.component';
import { OrderHistoryComponent } from './Omar/order-history/order-history.component';



 


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "aboutAs", component: AboutAsComponent },
  { path: 'home', component: HomeComponent },
  { path: "ourTeam", component: OurTeamComponent },
  { path: "testimonials", component: TestimonialsComponent },
  { path: "contactus", component: ContactusComponent }  ,


  

  { path: 'category', component: CategoryComponent },
  { path: 'product/:id', component: ProductsComponent },
  { path: 'productDetail/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },

  
    
  
  
    
  
  {
    path: 'Home', component: LandingPageComponent, children:
      [
        { path: 'Login', component: LoginComponent },
        { path: 'Register', component: RegisterComponent },
        { path: 'Profile', component: ProfileComponent },
        { path: 'EditProfile', component: EditprofileComponent },
        { path: 'Forget', component: ForgetpasswordComponent },
        { path: 'LastStep', component: LaststageforgetpasswordComponent },
        { path: 'Reset', component: ResetpasswordComponent },
        { path: 'User_History', component: OrderHistoryComponent  }
    ]
  },
  {
    path: 'getcategories', component: ManageCategoriesComponent
  },
  {
    path: 'addcategories', component: AddCategorieComponent
  },
  {
    path: 'editcategories/:id', component: EditCategorieComponent
  },
  {
    path: 'getusers', component: GetUsersComponent
  },
  {
    path: 'manage-product', component: ManageProductComponent
  },
  {
    path: 'admin-dashboard', component: DashboardComponent
  },
  {
    path: '', component:HomeComponent
  },

  {path: 'getcategories', component: ManageCategoriesComponent},
  {path: 'addcategories', component: AddCategorieComponent},
  {path: 'editcategories/:id', component: EditCategorieComponent},
  { path: 'getusers', component: GetUsersComponent },
  { path: 'checkout', component: CheckoutComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
