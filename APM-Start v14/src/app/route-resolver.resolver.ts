import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Product, ProductResolved } from './products/product';
import { ProductService } from './products/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

 constructor(private productservice : ProductService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>  {
    console.log(route)
    const id = route.paramMap.get('id');
    if (isNaN(Number(id))){
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of ({product : null , error: message})
    }
   return this.productservice.getProduct(Number(id))
   .pipe(
    map(product => ({product , error : ''})),
    catchError(error => {
      const message = `Reterival error : ${error}`;
      console.error(message);
      return of ({product : null , error: message})
    })
    )
  }
}
