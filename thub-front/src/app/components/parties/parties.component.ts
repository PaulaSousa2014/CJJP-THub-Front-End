import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent {
  parties: any[] = [];
  filteredParties: any[] = [];
  selectedPartyType: string = '';
  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;

  constructor(private partiesService: PartiesService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.getAllParties();
 
  }
  /*  if (filterByUser) {
          this.filteredParties = this.parties.filter(party => party.creator && party.creator.id === this.userId);
        } */

  getAllParties(filterByUser: boolean = false) {
    this.partiesService.getParties().subscribe({
      next: (data: any) => {
        this.parties = data;
        this.filteredParties = this.parties.filter(party => party.creator.id === this.userId);

        console.log(this.parties);
      },
      error: (error: any) => {
        console.log("Cannot get parties", error);
      }
    });
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

}
