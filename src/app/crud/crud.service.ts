import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, errorHandler } from 'rxjs/operators';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private httpclient: HttpClient,
  ) { }


  // Create product
  create(product):Observable<Product>{
    return this.httpclient.post<Product>(this.apiServer + '/products/', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(errorHandler),
    )
  }

  // Get product id
  getById(id):Observable<Product>{
    return this.httpclient.get<Product>(this.apiServer + '/product/' + id)
    .pipe(
      catchError(errorHandler),
    )
  }

  // Get all Product
  getAll():Observable<Product[]>{
    return this.httpclient.get<Product[]>(this.apiServer + '/product/')
    .pipe(
      catchError(errorHandler),
    )
  }

  // Update Product
  update(id, product): Observable<Product>{
    return this.httpclient.put<Product>(this.apiServer + '/product/', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(errorHandler),
    )
  }

  // Delete Product
  delete(id){
    return this.httpclient.delete<Product>(this.apiServer + '/product/' + id, this.httpOptions)
    .pipe(
      catchError(errorHandler),
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}
