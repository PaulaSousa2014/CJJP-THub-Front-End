import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent {
  // Posts array
  posts: any[] = [];

  constructor(private postService: PostService) {}

  // On page load, get all posts
  ngOnInit() {
    this.getAllPosts();
  }

  // Function to get posts and get likes/comments
  getAllPosts() {
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data;
        this.fetchPostDetails();
        console.log(this.posts);
      },
      error: (error: any) => {
        console.log("Cannot get posts", error);
      }
    });
  }

  // Function that gets likes and comments and adds them to each post
  fetchPostDetails() {
    for (const post of this.posts) {
      this.getLikes(post.id).subscribe({
        next: (likes: any) => {
          post.likes = likes;
        },
        error: (error: any) => {
          console.log("Cannot get likes", error);
        }
      });

      this.getCommentsNumber(post.id).subscribe({
        next: (comments: any) => {
          post.comments = comments;
        },
        error: (error: any) => {
          console.log("Cannot get comments", error);
        }
      });
    }
  }

  // Function to get likes from service
  getLikes(id: number) {
    return this.postService.getPostLikes(id);
  }

  // Function to get comment ammount from service
  getCommentsNumber(id: number) {
    return this.postService.getPostCommentsNumber(id);
  }
}
