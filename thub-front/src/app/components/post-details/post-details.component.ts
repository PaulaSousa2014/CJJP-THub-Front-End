import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  constructor(private route: ActivatedRoute, private postService: PostService, private location: Location) {}

  postFound: boolean = false;
  postCommentsFound: boolean = false;
  postId: number = 0;
  post: any;
  postComments: any;

  ngOnInit() {

    // Get id param from route
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
    });

    // get post by param id
    this.getPostById();

    // get comments by post id
    this.getCommentsByPostId();

  }

  // Function to get post by ID
  getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (data: any) => {
        this.post = data;
        this.postFound = true;
        console.log(this.post);
      },
      error: (error: any) => {
        console.log("Cannot get post info", error);
      }
    });
  }

  // Function to get comments by post ID
  getCommentsByPostId() {
    this.postService.getCommentsByPostId(this.postId).subscribe({
      next: (data: any) => {
        this.postComments = data;
        this.postCommentsFound = true;
      },
      error: (error: any) => {
        console.log("Cannot get post comments", error);
      }
    });
  }

  // Function to return to posts screen
  goBack() {
    this.location.back();
  }

}
