import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Creator, Party } from 'src/app/models/PartyModels';


@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent {
  id: number = 0;
  party: Party = {} as Party;
  parties: any[] = [];
  filteredParties: any[] = [];
  selectedPartyType: string = '';
  currentUser: any;
  creator: Creator = {} as Creator;

  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;


  constructor(private partiesService: PartiesService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.getAllParties();
  }


  getAllParties(filterByUser: boolean = false) {

    this.partiesService.getParties().subscribe({
      next: (data: any) => {
        this.parties = data;
        this.filteredParties = this.parties.filter(party => party.creator.id === this.userId);

        console.log(this.parties);

      },
      error: (error: any) => {
        console.log("Cannot get all parties", error);
      }
    });
  }

  readMore(id: number) {
    this.router.navigate(['/parties/id', id]);
    console.log(id);

  }

  filterPartiesByType(partyType: string) {

    this.selectedPartyType = partyType;

    if (partyType === 'all') {
      this.filteredParties = this.parties;
    } else {
      this.filteredParties = this.parties.filter(party => party[partyType] !== null);
    }
  }

  filterMyParties() {

    this.filteredParties = this.parties.filter(party => party.creator.id === this.userId);
  }

  allParties() {
    this.filteredParties = this.parties;
  }


  deleteParty(id: number, name: string) {
    const message: string = "Are you sure you want to delete the character " + name + "?";
    const userChoice = window.confirm(message);

    // If user confirms
    if (userChoice) {
      // Delete character by ID
      this.partiesService.deleteParty(id).subscribe({
        next: response => {
          // Refresh characters
          this.getAllParties();
        },
        error: error => {
          console.log("Something went wrong:", error);
        }
      });
    } else {
      return;
    }
  }

  getPartyImage(party: any): string {
    // Logic to determine the image URL based on the party
    // For example:
    if (party.activity) {
      return "../../../assets/carousel2.jpg";
    } else if (party.game) {
      return "../../../assets/carousel3.jpg";
    } else if (party.social) {
      return "../../../assets/carousel1.jpg";
    } else {
      return "../../../assets/login.jpg";
    }
  }
  
  

}

