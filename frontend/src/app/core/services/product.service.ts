import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + environment.products.listUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<any> {
    // Obtener token fresco cada vez que se hace una petición
    const token = this.authService.getToken();
    
    // Si no hay token, podrías manejar el error o redirigir al login
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
