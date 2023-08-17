import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Wishlist } from './shared/wishlist';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'wishlist', component: WishlistPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
