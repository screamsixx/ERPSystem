import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tokendata } from './../../interfaces/tokendata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//   private baseUrl = 'https://localhost:7200/api/Usuario';

  constructor(private http: HttpClient) { }

//ESTE SE VA USAR PARA LOGIN REAL
//  login(email: string, password: string): Observable<Tokendata> {
//   const url = `${this.baseUrl}/Login`;
//   const body = { email: email, password: password };
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   });
//   return this.http.post<Tokendata>(url, body, { headers: headers });

//LOGIN SIMULADO POR AHORA
login(username: string, password: string): Observable<Tokendata> {
    const tokenSimulado: Tokendata = {
      username: username,  // Usamos el username recibido
      rol: 'admin',        // Rol fijo (en producción, vendría del backend)
      id: '1',            // ID simulado
      token: 'abc123xyz456' // Token simulado
    };
    return of(tokenSimulado); // Convertimos a Observable
  }

}
