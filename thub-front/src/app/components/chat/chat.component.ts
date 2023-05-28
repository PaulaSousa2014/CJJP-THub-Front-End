import { ActivatedRoute } from '@angular/router';
import { Party } from 'src/app/models/PartyModels';
import { PartiesService } from 'src/app/services/parties.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  selectedTab = 'private';
  partySeleccionada: string | undefined;

  changeTab(tabId: string) {
    this.selectedTab = tabId;
  }
  party: Party = {} as Party; // Store current party
  currentUser: any; // Store user
  partyId: number = 0; // Store party id
  partyList: any; // Store user party list
  // Variables to check
  userInParty: boolean = false;
  partyLoaded: boolean = false;
  partyListLoaded: boolean = false;

  contactos: { id: number, nombre: string }[] = [];
  parties: { id: number, title: string, participantes: number }[] = [];

  //traer el id de parties, y mostrar el nombre en contactos

  constructor(private route: ActivatedRoute, private tokenStorage: TokenStorageService, private partiesService: PartiesService) {}



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentUser = this.tokenStorage.getUser();

    this.selectedTab = 'parties';
    // Get party id from route
    this.route.params.subscribe((params) => {
      this.partyId = +params['id'];
      // Recargar el componente después de obtener el ID de la fiesta
    });

    // Start chain function
    this.getAllParties();

  }


  // Get all parties
  getAllParties(filterByUser: boolean = true) {
    if (filterByUser) {
      this.partiesService.getUserPartyList(this.currentUser.id).subscribe({
        next: (data: any) => {
          // Get parties item from the partylist object
          const parties = data.map((item: any) => item.party);
          // Assign to parties
          this.parties = parties;
        },
        error: (error: any) => {
          console.log("Cannot get user's parties", error);
        }
      });
    } else {
      this.partiesService.getParties().subscribe({
        next: (data: any) => {
          this.parties = data;
          console.log(this.parties);
        },
        error: (error: any) => {
          console.log("Cannot get all parties", error);
        }
      });
    }
  }




}
