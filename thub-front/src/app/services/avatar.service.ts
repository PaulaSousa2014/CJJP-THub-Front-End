import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {


  selectedAvatar: string = '';

  constructor() {}

  setSelectedAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  getSelectedAvatar() {
    return this.selectedAvatar;
  }
}
