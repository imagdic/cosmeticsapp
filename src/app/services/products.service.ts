import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Products } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<Products[]> {
    // Fetch the products from Firestore with image URLs
    return this.firestore.collection<Products>('products').valueChanges();
  }
  
  getProductById(id: number): Observable<Products | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  // getBrands(): Observable<any[]> {
  //   // Fetch the brands from Firestore
  //   return this.firestore.collection('brands').valueChanges();
  // }

}
