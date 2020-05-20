import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  post: any = {};
  postId: number = null;
  
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.postId = params['postId'];
    });
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (err) => console.error(err),
      () => console.log('done loading post')
    );
  }
}
