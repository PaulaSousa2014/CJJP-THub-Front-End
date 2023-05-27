import { Component, OnInit } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';
import { PartyMembersService } from 'src/app/services/party-members.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  
  selectedTab = 'private';

  user: any;
  parties: any;

  contacts: { id: number; nombre: string }[] = [];

  changeTab(tabId: string) {
    this.selectedTab = tabId;
  }

  constructor(
    private friendsService: FriendsService,
    private partyMemberService: PartyMembersService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private partiesService: PartiesService
  ) {}

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getParties();
    this.getFriends();
  }

  //TODO arreglar que reciba la misma estructura de datos
  getFriends() {
    this.friendsService.getMyFriends(this.user.id).subscribe(
      (friends: any[]) => {
        if (Array.isArray(friends)) {
          this.contacts = friends;
        } else {
          console.log('Error retrieving friends: Invalid response format');
        }
      },
      (error) => {
        console.log('Error retrieving friends:', error);
      }
    );
  }
  
  getParties() {
    this.partyMemberService.getMyParties(this.user.id).subscribe(
      (parties: any[]) => {
        if (Array.isArray(parties)) {
          this.parties = parties;
        } else {
          console.log('Error retrieving parties: Invalid response format');
        }
      },
      (error) => {
        console.log('Error retrieving parties:', error);
      }
    );
  }
  
}
