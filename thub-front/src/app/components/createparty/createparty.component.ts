import { Game,  } from './../../models/CreatePartyModels';
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
  game: Game = {} as Game;
  games: any [] = [];
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
        const selectedGameId = this.formulario.value.game; // Obtener el ID del juego seleccionado
        this.party.game = { id: selectedGameId }; // Asignar el juego al campo 'game' de la fiesta
        console.log(selectedGameId); // Mostrar el ID del juego seleccionado en la consola
      }

      console.log(this.party);
    } else {
      console.log("Error en el envío del formulario");
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
  /*submitParty() {
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
  }*/

}
