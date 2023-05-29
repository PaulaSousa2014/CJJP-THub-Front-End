import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Location } from '@angular/common';
import { Post, User, Comment } from 'src/app/models/CommentModels';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  constructor(private route: ActivatedRoute, private postService: PostService, private location: Location, private tokenStorage: TokenStorageService,
    private router: Router) {}

  // Boolean checks
  postFound: boolean = false;
  postCommentsFound: boolean = false;
  likesFound: boolean = false;

  // Vars
  postId: number = 0;
  post: any;
  postComments: any;
  likeNum: number = 0;
  commentUser: User = {} as User;
  commentInPost: Post = {} as Post;
  newComment: Comment = {} as Comment;


  // MAIN
  ngOnInit() {

    // Get id param from route
    this.route.params.subscribe((params) => {
      this.postId = +params['id']; // Get post id
      this.commentInPost.id = this.postId; // Add post Id to object
      this.commentUser.id = this.tokenStorage.getUser().id; // Get current user Id from token storage
    });

    // get post by param id
    this.getPostById();

    // Get post like number
    this.getLikes();

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

  // Function to get likes from post Id
  getLikes() {
    this.postService.getPostLikes(this.postId).subscribe({
      next: (data: any) => {
        this.likeNum = data;
        this.likesFound = true;
      },
      error: (error: any) => {
        console.log("Cannot get post likes", error);
      }
    });
  }

  submitComment() {
    // Check comment is not empty or only blank spaces
    if (!this.newComment.content || this.newComment.content.trim() === '') {
      window.alert('Comment cannot be empty'); // alerts
      this.newComment.content= ''; // Resets field
      return;
    } else {
      this.newComment.comment_by = this.commentUser;
      this.newComment.in_post = this.commentInPost;
      this.postComment();
    }
  }

  // Function to format timestamp
  formatTimestamp(serverTimestamp: string): string {
    const serverTime = new Date(serverTimestamp + 'Z'); // Add 'Z' for UTC time zone offset
    const localTime = new Date(); // Local datetime

    const timeDiff = Math.floor((localTime.getTime() - serverTime.getTime()) / 1000); // Time difference in seconds

    if (timeDiff < 60) {
      return `< 1 minute ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minutes ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours} hours ago`;
    } else {
      // Format the date and time in the user's local time
      const formattedDate = serverTime.toLocaleString();
      return formattedDate;
    }
  }

  // Function to post comment
  postComment() {
    this.postService.postComment(this.newComment).subscribe({
      next: (data: any) => {
        this.getCommentsByPostId();
        this.newComment.content='';
      },
      error: (error: any) => {
        console.log("Couldn't post comment", error);
      }
    })
  }

  //Function to delete post
  deletePost(postId: number) {
    console.log(postId);
    this.postService.deletePost(postId).subscribe({
      next: (response: any) => {
        console.log(response + 'Post deleted'); // Handle the successful response as needed
        this.router.navigate(['home']);
      },
      error: (error: any) => {
        console.log('Failed to delete post', error);
      },
    });
  }

  deleteComment(commentId: number) {

  }

}
