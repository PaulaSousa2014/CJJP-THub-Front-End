import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent {

  constructor(private postService: PostService) { }

  ngOnInit() {
    console.log("Hello world");
    this.getAllPosts();
  }


  getAllPosts() {
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log("Cannot get posts", error);
      }
    })
  }

}
