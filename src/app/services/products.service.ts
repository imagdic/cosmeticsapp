import { Injectable } from '@angular/core';
import { Products } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProductById(id:number): Products{
    return this.getProducts().find(product => product.id == id)!;
  }

  getProducts(): Products[]{
    return [
      {
        id: 1,
        price: 5,
        name: "Shampoo",
        description: "Nourishing shampoo from La Croa",
        brand: "La Croa",
        favorite: false,
        rating: 2.0,
        category: "Hair",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/la_croa_nourishing_sampon.jpg'
      },
      {
        id: 2,
        price: 5,
        name: "Argan shampoo",
        description: "Nourishing shampoo from La Croa",
        brand: "La Croa",
        favorite: false,
        rating: 2.5,
        category: "Haircare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/La-Croa-Argan-Sampon-za-kosu.jpg'
      },
      {
        id: 3,
        price: 5,
        name: "Keratin hair fluid",
        description: "Nourishing shampoo from La Croa",
        brand: "La Croa",
        favorite: false,
        rating: 5,
        category: "Haircare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/la-croa-keratin-hair-fluid.jpg'
      },
      {
        id: 4,
        price: 5,
        name: "Clarifying serum",
        description: "Nourishing shampoo from La Croa",
        brand: "L'Adria'",
        favorite: true,
        rating: 3.2,
        category: "Haircare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/LADRIA-clarifying-serum_124127.jpg'
      },
      {
        id: 5,
        price: 5,
        name: "Restorative mist",
        description: "Restorative mist from L'Adria for face hydratation",
        brand: "L'Adria",
        favorite: false,
        rating: 0,
        category: "Skincare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/LADRIA-Restorative-mist-8.jpg'
      },
      {
        id: 6,
        price: 5,
        name: "Lumion",
        description: "Restorative mist from L'Adria for face hydratation",
        brand: "Skintegra",
        favorite: false,
        rating: 4.3,
        category: "Skincare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/new_0009_Skintegra_LUMION_1500px.jpg'
      },
      {
        id: 7,
        price: 5,
        name: "Spectra",
        description: "Hydratizing face cream from Skintegra for face hydratation",
        brand: "Skintegra",
        favorite: true,
        rating: 5,
        category: "Skincare",
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/Skintegra-SPECTRA.jpg'
      }
    ];
  }
}
