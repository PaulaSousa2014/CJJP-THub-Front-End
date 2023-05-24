import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent {
  //array parties
  parties: any[] = [];

  constructor(private partiesService: PartiesService) {}

  // On page load, get all posts
  ngOnInit() {
    this.getAllParties();
  }

  // Function to get posts and get likes/comments
  getAllParties() {
    this.partiesService.getParties().subscribe({
      next: (data: any) => {
        this.parties = data;
        console.log(this.parties);
      },
      error: (error: any) => {
        console.log("Cannot get parties", error);
      }
    });
  }

}
