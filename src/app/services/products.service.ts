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
    return this.firestore.collection('products')
    .snapshotChanges()
    .pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as Products;
         const id = a.payload.doc.id;
         const product: Products = {
           id: id,
           name: data.name,
           brand: data.brand,
           category: data.category,
           price: data.price,
           description: data.description,
           imageUrl: data.imageUrl,
           rating: data.rating,
           favorite: false
         }
         return product;
       }))
    )
  }

  getProductById(productId: string): Observable<Products | undefined> {
    return this.firestore.collection<Products>('products').doc(productId).valueChanges();
  }
  

}
