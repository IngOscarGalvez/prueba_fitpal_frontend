import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Clase } from './clase';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiURL = environment.apiURL + 'clases/';
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }
  constructor(private httpClient: HttpClient) { }


  create(clase: any): Observable<Clase> {
    return this.httpClient.post<Clase>(this.apiURL, JSON.stringify(clase), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(id: any, clase: any): Observable<Clase> {
    return this.httpClient.put<Clase>(this.apiURL + id, JSON.stringify(clase), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: any){
    return this.httpClient.delete<Clase>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  obtenerDatosPaginados(page: number): Observable<any> {
    return this.httpClient.get(this.apiURL+'?page='+page);
  }

  buscarClase(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL+id);
  }

  borrarClase(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL+id);
  }
}
