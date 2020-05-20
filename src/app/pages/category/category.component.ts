import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  posts: any = [];
  categoryId: number = null;
  category: any = {};

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
    });
  }

  ngOnInit(): void {
    this.getPostsByCategory();
    this.getCategory();
  }

  getPostsByCategory() {
    this.postService.getPostsByCategory(this.categoryId).subscribe(
      (res) => {
        this.posts = res['data'];
      },
      (err) => console.error(err),
      () => console.log('done loading posts')
    );
  }

  getCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe(
      (data) => {
        this.category = data;
      },
      (err) => console.error(err),
      () => console.log('done loading posts')
    );
  }
}
