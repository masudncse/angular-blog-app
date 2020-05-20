import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  categories: any = [];
  posts: any = [];
  post: any = {
    title: '',
    contents: '',
    category_id: '',
  };
  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (res) => {
        this.posts = res['data'];
      },
      (err) => console.error(err),
      () => console.log('done loading posts')
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res['data'];
      },
      (err) => console.error(err),
      () => console.log('done loading categories')
    );
  }

  openModal() {
    return $('.modal-trigger').trigger('click');
  }

  closeModal() {
    return $('.modal-close').trigger('click');
  }

  resetPost() {
    this.post = {
      title: '',
      contents: '',
      category_id: '',
    };
  }

  createPost() {
    this.postService.createPost(this.post).subscribe(
      (res) => {
        this.getPosts();
        this.resetPost();
      },
      (err) => console.error(err),
      () => console.log('done create post')
    );
  }

  editPost(postId: number) {
    this.postService.getPost(postId).subscribe(
      (data) => {
        this.post = data;
        this.openModal();
      },
      (err) => console.error(err),
      () => console.log('done loading post')
    );
  }

  updatePost() {
    this.postService.updatePost(this.post, this.post.id).subscribe(
      (res) => {
        this.getPosts();
        this.resetPost();
        this.closeModal();
      },
      (err) => console.error(err),
      () => console.log('done update post')
    );
  }

  deletePost(postId: number) {
    if (window.confirm('Are you sure?')) {
      this.postService.deletePost(postId).subscribe(
        (res) => {
          this.getPosts();
        },
        (err) => console.error(err),
        () => console.log('done delete post')
      );
    }
  }
}
