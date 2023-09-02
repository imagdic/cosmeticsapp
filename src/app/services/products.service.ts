import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
