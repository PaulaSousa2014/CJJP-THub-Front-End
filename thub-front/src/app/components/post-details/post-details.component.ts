import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  postFound: boolean = false;
  postId: number = 0;
  post: any;

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
    });

    this.getPostById();

  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (data: any) => {
        this.post = data;
        this.postFound = true;
        console.log(this.post);
      },
      error: (error: any) => {
        console.log("Cannot get likes", error);
      }
    });

  }

}
