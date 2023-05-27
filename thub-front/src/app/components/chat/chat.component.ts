import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Party } from 'src/app/models/PartyModels';
import { PartiesService } from 'src/app/services/parties.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  selectedTab = 'private';
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

  constructor(private partiesService: PartiesService, private tokenStorage: TokenStorageService, private route: ActivatedRoute,


  ) {
    this.contactos = [
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'María García' },
      { id: 3, nombre: 'Pedro López' }
    ];


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentUser = this.tokenStorage.getUser();

    // Get party id from route
    this.route.params.subscribe((params) => {
      this.partyId = +params['id'];
    });

    // Start chain function
    this.getPartyById();
    this.getAllParties();

  }

   // Get all parties
   getAllParties(filterByUser: boolean = false) {
    if (filterByUser) {
      this.partiesService.getUserPartyList(this.currentUser.id).subscribe({
        next: (data: any) => {
          this.parties = data;
          console.log(this.parties);
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
  // Gets party by id

  getPartyById() {
    this.partiesService.getPartiesId(this.partyId).subscribe({
      next: (data: any) => {
        this.party = data; // Adds data to party
        this.partyLoaded = true; // sets party Loaded to true
        this.party.title = data.title; // Obtén el título de la fiesta
        this.getPartyMemberlist(); // Executes next function
        console.log('1');
        console.log(data.title);
      },
      error: (error: any) => { },
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
        this.getAllParties(true); // Obtén solo las parties del usuario actual
      },
      error: (error: any) => { },
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

}
