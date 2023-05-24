import { Component } from '@angular/core';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css']
})
export class AvatarsComponent {

  avatars: string[] = ['cat0.jpg', 'cat1.jpg', 'cat2.jpg', 'cat3.jpg', 'cat4.jpg', 'cat5.jpg', 'cat6.jpg',
  'cat7.jpg', 'cat8.jpg', 'cat9.jpg', 'cat10.jpg', 'cat11.jpg', 'cat12.jpg', 'cat13.jpg', 'cat14.jpg', 'cat15.jpg', 'cat16.jpg', 'cat17.jpg'];
  selectedAvatar: string = '';
  savedAvatar: string = '';

  selectAvatar(image: string): void {
    this.selectedAvatar = image;
  }


}
