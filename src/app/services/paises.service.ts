import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private jsonURL = 'assets/data/paises.json'; // Certifique-se de que o caminho está correto

  constructor(private http: HttpClient) { }

  getPaises(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
}
