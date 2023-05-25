import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Horario } from './horario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiURL = environment.apiURL + 'horarios/';

  private apiURLListar = environment.apiURL + "listarClasesSelect/";
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }
  constructor(private httpClient: HttpClient) { }


  create(horario: any): Observable<Horario> {
    return this.httpClient.post<Horario>(this.apiURL, JSON.stringify(horario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(id: any, horario: any): Observable<Horario> {
    return this.httpClient.put<Horario>(this.apiURL + id, JSON.stringify(horario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: any){
    return this.httpClient.delete<Horario>(this.apiURL + id, this.httpOptions)
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

  obtenerDatosPaginados(page: number,historico: number): Observable<any> {
    return this.httpClient.get(this.apiURL+'?page='+page+'&historico='+historico);
  }

  buscarHorario(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL+id);
  }

  borrarHorario(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL+id);
  }

  obtenerListaClase(): Observable<any> {
    return this.httpClient.get(this.apiURLListar);
  }

}
