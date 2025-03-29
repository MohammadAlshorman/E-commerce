import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Mohammad/home/home.component';
import { AboutAsComponent } from './Mohammad/about-as/about-as.component';
import { OurTeamComponent } from './Mohammad/our-team/our-team.component';
import { TestimonialsComponent } from './Mohammad/testimonials/testimonials.component';
import { ContactusComponent } from './Mohammad/contactus/contactus.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "aboutAs", component: AboutAsComponent },
  { path: 'home', component: HomeComponent },
  { path: "ourTeam", component: OurTeamComponent },
  { path: "testimonials", component: TestimonialsComponent },
  { path: "contactus", component: ContactusComponent }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
