import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';
import { Creator, Post } from 'src/app/models/PostModels';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent {
  // Posts array
  posts: any[] = [];
  creator: Creator = {} as Creator;
  filteredPosts: any[] = [];
  searchText: string = '';
  post: Post = {} as Post;
  currentUser = this.tokenStorage.getUser();

  constructor(private postService: PostService, private datePipe: DatePipe, private tokenStorage: TokenStorageService) { }

  // On page load, get all posts
  ngOnInit() {
    console.log("init");
    this.getAllPosts();
    this.filterPosts();
  }

  // Function to get posts and get likes/comments
  getAllPosts() {
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        console.log("getting posts")
        this.posts = data;
        this.sortPostsByTimestamp(); // Sort the posts by timestamp
        this.fetchPostDetails();
        console.log(this.posts);
        this.filterPosts();

      },
      error: (error: any) => {
        console.log("Cannot get posts", error);
      }
    });
  }
  filterPosts() {
    if (!this.searchText) {
      this.filteredPosts = this.posts;
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredPosts = this.posts.filter((post: any) => {
        return post.content.toLowerCase().includes(searchTextLower);
      });
    }
  }

  // Function that gets likes and comments and adds them to each post
  fetchPostDetails() {
    for (const post of this.posts) {

      console.log(this.post.time_submitted)
      post.time_submitted = this.formatTimestamp(post.time_submitted);
      console.log(this.post.time_submitted);

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


  // Function to submit post
  submitPost() {
    this.creator.id = this.currentUser.id;
    this.post.creator = this.creator;
    console.log("button pressed");
    console.log(this.post);

    this.postService.postNewPost(this.post).subscribe({
      next: (data: any) => {
        console.log(data);
        location.reload(); // Recargar la página después de enviar el post exitosamente
      },
      error: (error: any) => {
        console.log("Cannot post Post", error);
      }
    });
    this.getAllPosts();

  }

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

  sortPostsByTimestamp() {
    this.posts.sort((a, b) => {
      const timestampA = new Date(a.time_submitted);
      const timestampB = new Date(b.time_submitted);
      return timestampB.getTime() - timestampA.getTime();
    });
  }

  doStuff() {
    console.log("aaaaaaaaa")
  }

}
