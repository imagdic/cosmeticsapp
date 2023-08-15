import { Injectable } from '@angular/core';
import { Products } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getAll(): Products[]{
    return [
      {
        id: 1,
        price: 5,
        name: "Shampoo",
        brand: "La Croa",
        favorite: false,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/la_croa_nourishing_sampon.jpg'
      },
      {
        id: 2,
        price: 5,
        name: "Argan shampoo",
        brand: "La Croa",
        favorite: false,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/La-Croa-Argan-Sampon-za-kosu.jpg'
      },
      {
        id: 3,
        price: 5,
        name: "Keratin hair fluid",
        brand: "La Croa",
        favorite: false,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/la-croa-keratin-hair-fluid.jpg'
      },
      {
        id: 4,
        price: 5,
        name: "Clarifying serum",
        brand: "L'Adria'",
        favorite: true,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/LADRIA-clarifying-serum_124127.jpg'
      },
      {
        id: 5,
        price: 5,
        name: "Restorative mist",
        brand: "L'Adria",
        favorite: false,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/LADRIA-Restorative-mist-8.jpg'
      },
      {
        id: 6,
        price: 5,
        name: "Lumion",
        brand: "Skintegra",
        favorite: false,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/new_0009_Skintegra_LUMION_1500px.jpg'
      },
      {
        id: 7,
        price: 5,
        name: "Spectra",
        brand: "Skintegra",
        favorite: true,
        star: 0,
        tags: ['face cream', 'moisturizing'],
        imageUrl: '/assets/Skintegra-SPECTRA.jpg'
      }
    ];
  }
}
