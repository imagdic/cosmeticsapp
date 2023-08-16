import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'primeng/rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WishlistPageComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
