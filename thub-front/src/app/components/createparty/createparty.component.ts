import { Activity, Game, Social } from './../../models/CreatePartyModels';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Party, Creator } from 'src/app/models/CreatePartyModels';
import { CreatepartyService } from 'src/app/services/createparty.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';



@Component({
  selector: 'app-createparty',
  templateUrl: './createparty.component.html',
  styleUrls: ['./createparty.component.css']
})
export class CreatepartyComponent {
  formulario: FormGroup;
  creator: Creator = {} as Creator;
  activity: Activity = {} as Activity;
  game: Game = {} as Game;
  games: any [] = [];
  social: Social = {} as Social;
  party: Party = {} as Party;
  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;

  constructor(private createPartyService: CreatepartyService, private tokenStorageService: TokenStorageService) {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      partyType: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.userId = this.user.id;
    this.getGames();
    //funcion que coja los juegos de la base de datos
    //crear servicio como en parties.
  }


  submitForm() {
    if (this.formulario.valid) {
      this.party.title = this.formulario.value.title;
      this.party.description = this.formulario.value.description;
      const partyType = this.formulario.value.partyType;

      if (partyType === 'Game') {
        this.game = this.formulario.value.id;
        this.party.game = this.game;
      } else if (partyType === 'Activity') {
        this.party.activity = this.formulario.value.activity.id;
      } else if (partyType === 'Social') {
        console.log(partyType);
        console.log(this.party.social);
        this.party.social = this.formulario.value.social.id;
      }

      console.log(this.party);
      this.submitParty();
    } else {
      console.log("error envio")
    }
  }

  //GAMES
  getGames() {

    this.createPartyService.getGames().subscribe({
      next: (data: any) => {
        this.games = data; // Asignar los juegos a la variable games
        console.log(data);
        console.log("Funciona");
      },
      error: (error: any) => {
        console.log("No se puede enviar la fiesta", error);
      }
    });

  }


  // Function to submit post
  submitParty() {
    this.party.creator = this.creator;
    this.creator.id = this.userId;
    console.log("button pressed");
    console.log(this.party);
    this.createPartyService.postNewParty(this.party).subscribe({
      next: (data: any) => {
        console.log(data);
        console.log("Funciona");
      },
      error: (error: any) => {
        console.log("No se puede enviar la fiesta", error);
      }
    });
  }

}
