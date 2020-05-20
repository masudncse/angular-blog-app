import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  headers = {};
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers['authorization'] = this.authService.token();
  }

  getPosts() {
    return this.http.get('http://localhost:8000/api/posts', {
      headers: this.headers,
    });
  }

  getPost(postId: number) {
    return this.http.get('http://localhost:8000/api/posts/' + postId, {
      headers: this.headers,
    });
  }

  getPostsByCategory(categoryId: number) {
    return this.http.get(
      'http://localhost:8000/api/posts/category/' + categoryId,
      {
        headers: this.headers,
      }
    );
  }

  createPost(post: object) {
    return this.http.post('http://localhost:8000/api/posts/', post, {
      headers: this.headers,
    });
  }

  updatePost(post: object, postId: number) {
    return this.http.put('http://localhost:8000/api/posts/' + postId, post, {
      headers: this.headers,
    });
  }

  deletePost(postId: number) {
    return this.http.delete('http://localhost:8000/api/posts/' + postId, {
      headers: this.headers,
    });
  }
}
