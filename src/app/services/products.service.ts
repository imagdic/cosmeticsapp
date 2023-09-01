import { Injectable } from '@angular/core';
import { Products } from '../shared/products';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<Products[]> {
    return this.firestore.collection<Products>('products').valueChanges();
  }

  // getProductById(id:number): Products{
  //   return this.getProducts().find(product => product.id == id)!;
  // }


}
