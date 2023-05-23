import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent {

  posts: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getAllPosts();
  }


  getAllPosts() {
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data;
        console.log (this.posts[0].creator);
      },
      error: (error: any) => {
        console.log("Cannot get posts", error);
      }
    })
  }

}
