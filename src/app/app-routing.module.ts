import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Wishlist } from './shared/wishlist';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'wishlist',component: WishlistPageComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
