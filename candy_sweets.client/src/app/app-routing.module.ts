import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Mohammad/home/home.component';

import { LandingPageComponent } from './Omar/landing-page/landing-page.component';
import { ProfileComponent } from './Omar/profile/profile.component';
import { LoginComponent } from './Omar/login/login.component';
import { RegisterComponent } from './Omar/register/register.component';
import { EditprofileComponent } from './Omar/editprofile/editprofile.component';
import { ForgetpasswordComponent } from './Omar/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './Omar/resetpassword/resetpassword.component';
import { LaststageforgetpasswordComponent } from './Omar/laststageforgetpassword/laststageforgetpassword.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: 'Home', component: LandingPageComponent, children:
      [
        { path: 'Login', component: LoginComponent },
        { path: 'Register', component: RegisterComponent },
        { path: 'Profile', component: ProfileComponent },
        { path: 'EditProfile', component: EditprofileComponent },
        { path: 'Forget', component: ForgetpasswordComponent },
        { path: 'LastStep', component: LaststageforgetpasswordComponent },
        { path: 'Reset', component: ResetpasswordComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
