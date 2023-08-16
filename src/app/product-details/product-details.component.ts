import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product!:Products;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) {
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      this.product = productService.getProductById(params['id']) 
    })
  }

  ngOnInit(): void {
    
  }

}
