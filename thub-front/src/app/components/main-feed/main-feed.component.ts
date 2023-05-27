import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';
import { Creator, Post } from 'src/app/models/PostModels';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

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
  foundLike: any;

  constructor(private postService: PostService, private datePipe: DatePipe, private tokenStorage: TokenStorageService, private changeDetectorRef: ChangeDetectorRef) { }

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
        this.fetchPostDetails(); // Get likes and comments for each post
        console.log(this.posts);
        this.filterPosts();
      },
      error: (error: any) => {
        console.log("Cannot get posts", error);
      }
    });
  }

  // Function to filter posts based on search text
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

  // Function to get likes and comments for each post
  fetchPostDetails() {
    for (const post of this.posts) {
      post.time_submitted = this.formatTimestamp(post.time_submitted);

      this.getLikes(post.id).subscribe({
        next: (likes: any) => {
          post.likes = likes;
          console.log(likes);
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

  // Function to toggle a like on a post
  toggleLike(post: any) {
    const userId = this.currentUser.id;

    this.isPostLiked(post, userId).subscribe((isLiked: boolean) => {
      console.log(userId);
      console.log(isLiked);

      if (isLiked) {
        console.log("Deleting like");
        this.deleteLike(post, userId);
      } else {
        console.log("Adding like");
        this.addLike(post, userId);
      }
    });
  }

  // Function to check if a post is liked by the user
  isPostLiked(post: any, userId: number): Observable<boolean> {
    console.log("In isPostLiked function");

    // Get the Observable of likes
    const likesObservable = this.postService.getAllLikes();
    console.log("likesObservables: " + likesObservable);

    // Transform the retrieved data into a new Observable
    return likesObservable.pipe(
      switchMap((likes: any[]) => {
        // Check if any like matches the specific post and user
        const isLiked = likes.some((like: any) => like.post_liked.id === post.id && like.user_liked.id === userId);

        // Save the found like in a variable
        this.foundLike = likes.find((like: any) => like.post_liked.id === post.id && like.user_liked.id === userId);
        return of(isLiked);
      })
    );
  }

  // Function to add a like to a post
  addLike(post: any, userId: number) {
    const newLike = {
      user_liked: this.currentUser,
      post_liked: post
    };

    this.postService.addLike(userId, post.id, newLike).subscribe({
      next: (response: any) => {
        console.log(response); // Handle the successful response as needed
        this.getLikes(post.id).subscribe({
          next: (likes: any) => {
            post.likes = likes;
            post.likesCount = likes.length; // Update the post's likes count
            this.changeDetectorRef.detectChanges(); // Update the view
          },
          error: (error: any) => {
            console.log("Cannot get likes", error);
          }
        });
      },
      error: (error: any) => {
        console.log("Failed to add like", error);
      }
    });
  }

  // Function to delete a like from a post
  deleteLike(post: any, userId: number) {
    this.postService.deleteLike(this.foundLike.id).subscribe({
      next: (response: any) => {
        console.log(response); // Handle the successful response as needed
        this.getLikes(post.id).subscribe({
          next: (likes: any) => {
            post.likes = likes;
            post.likesCount = likes.length; // Update the post's likes count
            this.changeDetectorRef.detectChanges(); // Update the view
          },
          error: (error: any) => {
            console.log("Cannot get likes", error);
          }
        });
      },
      error: (error: any) => {
        console.log("Failed to delete like", error);
      }
    });
  }

  // Function to get likes for a post
  getLikes(id: number) {
    return this.postService.getPostLikes(id);
  }

  // Function to get the number of comments for a post
  getCommentsNumber(id: number) {
    return this.postService.getPostCommentsNumber(id);
  }

  // Function to submit a new post
  submitPost() {
    this.creator.id = this.currentUser.id;
    this.post.creator = this.creator;
    console.log("button pressed");
    console.log(this.post);

    this.postService.postNewPost(this.post).subscribe({
      next: (data: any) => {
        console.log(data);
        location.reload(); // Reload the page after successfully submitting the post
      },
      error: (error: any) => {
        console.log("Cannot post Post", error);
      }
    });
    this.getAllPosts();
  }

  // Function to format the timestamp of a post
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

  // Function to sort posts by timestamp
  sortPostsByTimestamp() {
    this.posts.sort((a, b) => {
      const timestampA = new Date(a.time_submitted);
      const timestampB = new Date(b.time_submitted);
      return timestampB.getTime() - timestampA.getTime();
    });
  }

  doStuff() {
    console.log("aaaaaaaaa");
  }
}


