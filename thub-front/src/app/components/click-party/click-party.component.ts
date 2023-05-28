import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Creator, Party } from 'src/app/models/PartyModels';
import { PartiesService } from 'src/app/services/parties.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-click-party',
  templateUrl: './click-party.component.html',
  styleUrls: ['./click-party.component.css'],
})
export class ClickPartyComponent {
  // Variables to store data
  party: Party = {} as Party; // Store current party
  currentUser: any; // Store user
  partyList: any; // Store user party list
  partyId: number = 0; // Store party id

  // Variables to check
  userInParty: boolean = false;
  partyLoaded: boolean = false;
  partyListLoaded: boolean = false;

  constructor(
    private partiesService: PartiesService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    // Get user from token storage
    this.currentUser = this.tokenStorage.getUser();

    // Get party id from route
    this.route.params.subscribe((params) => {
      this.partyId = +params['id'];
    });

    // Start chain function
    this.getPartyById();
  }

  // Gets party by id
  getPartyById() {
    this.partiesService.getPartiesId(this.partyId).subscribe({
      next: (data: any) => {
        this.party = data; // Adds data to party
        this.partyLoaded = true; // sets party Loaded to true
        this.getPartyMemberlist(); // Executes next function
        console.log('1');
      },
      error: (error: any) => {},
    });
  }

  // Gets party list by user id
  getPartyMemberlist() {
    this.partiesService.getUserPartyList(this.currentUser.id).subscribe({
      next: (data: any) => {
        this.partyList = data;
        this.partyListLoaded = true;
        console.log('2');
        this.isUserInParty();
      },
      error: (error: any) => {},
    });
  }

  isUserInParty(): void {
    const userFound = this.partyList.some(
      (element: any) => element.party.id === this.party.id
    );

    console.log('3');
    if (userFound) {
      this.userInParty = true;
    } else {
      this.userInParty = false;
    }
  }

  goBack() {
    this.router.navigate(['/parties']);
  }

  getPartyImage(party: any): string {
    // Logic to determine the image URL based on the party
    if (party.activity) {
      return '../../../assets/activities.jpg';
    } else if (party.game) {
      return '../../../assets/games.jpg';
    } else if (party.social) {
      return '../../../assets/carousel1.jpg';
    } else {
      return '../../../assets/login.jpg';
    }
  }

  //Join this party
  join() {
    this.partiesService
      .joinParty(this.partyId, this.currentUser.id, this.party)
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error: any) => {
          console.log('Error joining the party', error);
        },
      });
  }

  //exit this party
  exit() {
this.partiesService.exitParty(this.partyId).subscribe({
  next: () => {
    window.location.reload();
  },
  error: (error: any) => {
    console.log('Error deleting the party', error);
  },
});

  }
}
