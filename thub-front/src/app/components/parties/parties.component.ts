import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Creator, Party } from 'src/app/models/PartyModels';
import Swal from 'sweetalert2';

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
  searchTerm: string = '';
  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;
  partyMemberCounts: number[] = [];

  constructor(
    private partiesService: PartiesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.getAllParties();
  }

  // Get all parties
  getAllParties(filterByUser: boolean = false) {
    this.partiesService.getParties().subscribe({
      next: (data: any) => {
        this.parties = data;
        this.filteredParties = [...this.parties]; // Copy all parties to filteredParties without applying the creator filter
        console.log(this.parties);

        // Initialize the partyMemberCounts array with zeros for each party
        this.partyMemberCounts = new Array(this.filteredParties.length).fill(0);

        // Call getPartyMembersCount() for each party after retrieving all parties
        this.filteredParties.forEach((party, index) => {
          this.getPartyMembersCount(party.id, index);
        });
      },
      error: (error: any) => {
        console.log("Cannot get all parties", error);
      }
    });
  }

  // Filter parties based on search term
  filterParties() {
    if (this.searchTerm.trim() === '') {
      this.filteredParties = this.parties;
    } else {
      const lowercaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredParties = this.parties.filter(party => {
        return party.title.toLowerCase().includes(lowercaseSearchTerm);
      });
    }
  }

  // Navigate to party details page
  readMore(id: number) {
    this.router.navigate(['/parties/id', id]);
    console.log(id);
  }

  // Filter parties based on party type
  filterPartiesByType(partyType: string) {
    this.selectedPartyType = partyType;

    if (partyType === 'all') {
      this.filteredParties = this.parties;
    } else {
      this.filteredParties = this.parties.filter(
        party => party[partyType] !== null
      );
    }
  }

  // Filter parties based on the current user
  filterMyParties() {
    this.filteredParties = this.parties.filter(
      party => party.creator.id === this.userId
    );
  }

  // Show all parties
  allParties() {
    this.filteredParties = this.parties;
  }

  // Delete a party
  deleteParty(id: number, name: string) {
    const message: string =
      "Are you sure you want to delete the character " + name + "?";

    Swal.fire({
      title: 'Are you sure?',
      text: "You're going to delete this party. Won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I know, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your party has been deleted.',
          'success'
        );

        this.partiesService.deleteParty(id).subscribe({
          next: response => {
            // Refresh parties
            this.getAllParties();
          },
          error: error => {
            console.log("Something went wrong:", error);
          }
        });
      }
    });
  }

  // Get the image URL for a party
  getPartyImage(party: any): string {
    // Logic to determine the image URL based on the party

    if (party.activity) {
      return "../../../assets/activities.jpg";
    } else if (party.game) {
      return "../../../assets/games.jpg";
    } else if (party.social) {
      return "../../../assets/carousel1.jpg";
    } else {
      return "../../../assets/card1.png";
    }
  }

  // Get the member count for a party
  getPartyMembersCount(partyId: number, index: number) {
    this.partiesService.getPartyMembersListByPartyId(partyId).subscribe({
      next: (members: any) => {
        if (members && members.length) {
          const memberCount = members.length;
          console.log('Member count:', memberCount); // Check the value of memberCount

          this.partyMemberCounts[index] = memberCount;
          this.filteredParties[index].memberCount = memberCount; // Add the count to the party object
        } else {
          this.partyMemberCounts[index] = 0;
          this.filteredParties[index].memberCount = 0; // Set the count to 0 for the party
        }
      },
      error: (error: any) => {
        console.log("Cannot get party members", error);
      }
    });
  }
}
