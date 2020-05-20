import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  headers = {};
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers['authorization'] = this.authService.token();
  }

  getCategories() {
    return this.http.get('http://localhost:8000/api/categories', {
      headers: this.headers,
    });
  }

  getCategory(categoryId: number) {
    return this.http.get('http://localhost:8000/api/categories/' + categoryId, {
      headers: this.headers,
    });
  }

  createCategory(category: object) {
    return this.http.post('http://localhost:8000/api/categories/', category, {
      headers: this.headers,
    });
  }

  updateCategory(category: object, categoryId: number) {
    return this.http.put(
      'http://localhost:8000/api/categories/' + categoryId,
      category,
      {
        headers: this.headers,
      }
    );
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(
      'http://localhost:8000/api/categories/' + categoryId,
      {
        headers: this.headers,
      }
    );
  }
}
