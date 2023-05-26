import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component } from '@angular/core';
import { PartiesService } from 'src/app/services/parties.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Party } from 'src/app/models/PartyModels';


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


  constructor(private partiesService: PartiesService, private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) {
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



  }

