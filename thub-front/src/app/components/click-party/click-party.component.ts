import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Creator, Party } from 'src/app/models/PartyModels';
import { PartiesService } from 'src/app/services/parties.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-click-party',
  templateUrl: './click-party.component.html',
  styleUrls: ['./click-party.component.css'],
})
export class ClickPartyComponent implements OnInit {
  // Attribute to store id and character
  partyId: number = 0;
  party: Party = {} as Party;
  creator: Creator = {} as Creator;
  currentUser: any;
  partyList: any;

  constructor(
    private partiesService: PartiesService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    // Get the id from the route parameters
    this.route.params.subscribe((params) => {
      this.partyId = +params['id'];

      if (this.partyId) {
        this.partiesService.getPartiesId(this.partyId).subscribe((data: Party) => {
          console.log('Data: ' + data);
          this.party = data;
        });
      }
    });

    this.getParties();
  }

  getParties() {
    this.partiesService.getMemberParties(this.currentUser.id).subscribe({
      next: (data: any) => {
        console.log('getting members');
        this.partyList = data;
      },
      error: (error: any) => {
        console.log('Cannot get members', error);
      },
    });
  }


  isUserInParty(): boolean {

    this.partyList.forEach((element: any) => {
      console.log(this.partyId);
      if (element.party.id === this.partyId) {
        console.log("User is in party!");
      }
    });
    return false;

  }


  goBack() {
    this.router.navigate(['/parties']);
  }

  getPartyImage(party: any): string {
    // Logic to determine the image URL based on the party
    if (party.activity) {
      return '../../../assets/carousel2.jpg';
    } else if (party.game) {
      return '../../../assets/carousel3.jpg';
    } else if (party.social) {
      return '../../../assets/carousel1.jpg';
    } else {
      return '../../../assets/login.jpg';
    }
  }
}
