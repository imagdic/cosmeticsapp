import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Products } from '../shared/products';
import { RatingService } from './rating.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private firestore: AngularFirestore, private ratingService: RatingService) { }

  getProducts(): Observable<Products[]> {
    return this.firestore.collection('products')
    .snapshotChanges()
    .pipe(
       switchMap(products => {
          // Convert the snapshot changes to product objects
          const productObservables = products.map(productSnapshot => {
             const productData = productSnapshot.payload.doc.data() as Products;
             const productId = productSnapshot.payload.doc.id;
             return this.ratingService.getRatingsForProduct(productId).pipe(
                 map(ratings => {
                    const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
                    const averageRating = ratings.length ? totalRating / ratings.length : 0;

                    // Return a new product object with the average rating
                    return {
                       ...productData,
                       id: productId,
                       rating: averageRating,
                       favorite: false // This is hardcoded as per your example
                    } as Products;
                 })
             );
          });

          return combineLatest(productObservables);
       })
    );
}


getProductById(productId: string): Observable<Products | undefined> {
  return this.firestore.collection<Products>('products').doc(productId).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Products;
        const id = action.payload.id;
        return {
          id: id,
          name: data.name,
          brand: data.brand,
          category: data.category,
          price: data.price,
          description: data.description,
          imageUrl: data.imageUrl,
          rating: data.rating,
          favorite: data.favorite
        };
      })
    );
}

  

}
