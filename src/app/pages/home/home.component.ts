import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {}
  posts: any = [];
  ngOnInit(): void {
    this.getPosts();
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
}
