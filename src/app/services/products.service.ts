import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, map, switchMap, throwError } from 'rxjs';
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
            return this.ratingService.getProductRating(productId).pipe(
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
        switchMap(action => {
          const data = action.payload.data() as Products;
          const id = action.payload.id;
          return this.ratingService.getProductRating(productId).pipe(
            map(ratings => {
              const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
              const averageRating = ratings.length ? totalRating / ratings.length : 0;
              return {
                ...data,
                id: id,
                rating: averageRating
              } as Products;
            })
          );
        })
      );
  }

  getProductsByCategory(category: string): Observable<Products[]> {
    return this.firestore.collection<Products>('products', ref => ref.where('category', '==', category))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Products;
          const id = a.payload.doc.id;
          return {
            ...data,
            id: id
          };
        }))
      );
  }

  searchProductsByName(searchValue: string): Observable<any[]> {
    return this.firestore.collection('products', ref => 
        ref.where('name', '>=', searchValue)
        .where('name', '<=', searchValue + '\uf8ff')
    ).snapshotChanges()
    .pipe(
        map(actions => {
            const products = actions.map(a => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
            console.log('Products found:', products); 
            return products;
        }),
        catchError(error => {
            console.error('Error fetching products:', error);  // Log the error
            return throwError(error);  // Re-throw the error to handle it elsewhere if needed
        })
    );
}

  


}
