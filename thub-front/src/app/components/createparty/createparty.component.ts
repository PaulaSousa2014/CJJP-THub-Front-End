import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Party, Creator, Game, Activity, Social } from 'src/app/models/PartyModels';
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
  games: any[] = [];
  selectedGameId: any = 0;
  activity: Activity = {} as Activity;
  activities: any[] = [];
  selectedActivityId: any = 0;
  social: Social = {} as Social;
  socials: any[] = [];
  selectedSocialId: any = 0;

  partyType: any = '';
  party: Party = {} as Party;

  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;
  constructor(private createPartyService: CreatepartyService, private router: Router,  private tokenStorageService: TokenStorageService) {
        // Initialize the form and its controls
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      partyType: new FormControl('', Validators.required),
      game: new FormControl(null),
      social: new FormControl(null),
      activity: new FormControl(null)
    }, {
      validators: [
                // Conditional validator to require 'game' when 'partyType' is 'Activity'
        this.conditionalRequiredValidator(() => this.partyType === 'Activity', 'game'),
                // Conditional validator to require 'activity' when 'partyType' is 'Game'
        this.conditionalRequiredValidator(() => this.partyType === 'Game', 'activity'),
                // Conditional validator to require 'activity' when 'partyType' is 'Social'
        this.conditionalRequiredValidator(() => this.partyType === 'Social', 'activity')]
    });
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.userId = this.user.id;
    this.getGames();
    this.getActivities();
    this.getSocial();

  }

  submitForm() {
    if (this.formulario.valid) {
            // Get the form values
      this.party.title = this.formulario.value.title;
      this.party.description = this.formulario.value.description;
      this.partyType = this.formulario.value.partyType;

      if (this.partyType === 'Game') {
        this.party.activity = null;
        this.party.social = null;

        this.selectedGameId = this.formulario.value.game;
        this.party.game = { id: this.selectedGameId };
      } else if (this.partyType === 'Activity') {
        this.selectedActivityId = this.formulario.value.activity;
        this.party.activity = { id: this.selectedActivityId };
        this.party.game = null;
        this.party.social = null;

      } else if (this.partyType === 'Social') {
        this.selectedSocialId = this.formulario.value.social;
        this.party.social = { id: this.selectedSocialId };
        this.party.activity = null;
        this.party.game = null;

      }

      console.log(this.party);
      console.log("selectedgame:" + this.selectedGameId);
      console.log("selectedgame:" + this.selectedActivityId);
      this.submitParty();
    } else {
      console.log("Error en el envío del formulario");
    }
  }

  getGames() {
    this.createPartyService.getGames().subscribe({
      next: (data: any) => {
        this.games = data;
        console.log(data);
        console.log("Funciona");
      },
      error: (error: any) => {
        console.log("No se puede enviar la party", error);
      }
    });
  }

  getActivities() {
    this.createPartyService.getActivities().subscribe({
      next: (data: any) => {
        this.activities = data;
        console.log(data);
        console.log("Funciona");
      },
      error: (error: any) => {
        console.log("No se puede enviar la party", error);
      }
    });
  }

  getSocial() {
    this.createPartyService.getSocial().subscribe({
      next: (data: any) => {
        this.socials = data;
        console.log(data);
        console.log("Funciona");
      },
      error: (error: any) => {
        console.log("No se puede enviar la party", error);
      }
    });
  }

  conditionalRequiredValidator(condition: () => boolean, controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (condition() && !control.value) {
        return { required: true };
      }
      return null;
    };
  }

  // Function to post the data.
  submitParty() {
    this.creator.id = this.userId; // Asign ID creator
    this.party.creator = this.creator;
    this.party.game = this.game;  //Asign object game to the game at party.
    this.party.activity = this.activity;  //Asign object game to the game at party.

    if (this.partyType === 'Game') {
      this.party.activity = null;
      this.party.social = null;
      this.game.id = this.selectedGameId; //Asign the id of the selected game to the property Id on Game.
    } else if (this.partyType === 'Activity') {
      this.party.game = null;
      this.party.social = null;
      this.activity.id = this.selectedActivityId; //Asign the id of the selected game to the property Id on Game.
    } else if (this.partyType === 'Social') {
      this.party.game = null;
      this.party.activity = null;
      this.social.id = this.selectedSocialId; //Asign the id of the selected game to the property Id on Game.
    }


    console.log(this.party);
    this.createPartyService.postNewParty(this.party).subscribe({
      next: (data: any) => {
        console.log(data);
        console.log("Funciona");

        window.alert("El formulario es correcto.");
        window.location.href = "/parties";
      },
      error: (error: any) => {
        console.log("No se puede enviar la fiesta", error);
      }
    });
  }

}
