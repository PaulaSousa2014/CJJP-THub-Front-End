import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent {
  // Posts array
  posts: any[] = [];

  constructor(private postService: PostService, private datePipe: DatePipe) {}

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

  // Function to format timestamp to be more user friendly
  formatTimestamp(timestamp: string): string {
    const currentTime = new Date();
    const submittedTime = new Date(timestamp);
    const timeDiff = Math.floor((currentTime.getTime() - submittedTime.getTime()) / 1000); // Time difference in seconds

    if (timeDiff < 60) {
      return `${timeDiff} seconds ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minutes ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours} hours ago`;
    } else {
      // Use Angular's DatePipe to format the date in a desired format
      const formattedDate = this.datePipe.transform(submittedTime, 'yyyy-MM-dd HH:mm');
      return formattedDate || ''; // Handle null formattedDate
    }
  }

}
