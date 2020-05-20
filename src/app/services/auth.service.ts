import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: object) {
    return this.http.post('http://localhost:8000/api/auth/login', credentials);
  }

  token() {
    return localStorage.getItem('token')
      ? 'Bearer' + localStorage.getItem('token')
      : '';
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
