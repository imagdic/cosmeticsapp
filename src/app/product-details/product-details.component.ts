import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product: Products | undefined;
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private wishlistService: WishlistService) {
    // activatedRoute.params.subscribe((params)=>{
    //   if(params['id'])
    //   this.product = productService.getProductById(params['id']) 
    // })
  }

  addToWishlist(product: Products) {
    this.wishlistService.addToWishlist(product);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
  }

}
