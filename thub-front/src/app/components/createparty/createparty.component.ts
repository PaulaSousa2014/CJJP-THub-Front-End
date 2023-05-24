import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Party, Creator} from 'src/app/models/CreatePartyModels';
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
  party: Party = { title: '', description: '', creator: this.creator, activity: null, game: null, social: null };
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
    this.userId = this.user.id;  }

  submitForm() {
    if (this.formulario.valid) {
      this.party.title = this.formulario.value.title;
      this.party.description = this.formulario.value.description;
      const partyType = this.formulario.value.partyType;
      if (partyType === 'Game') {
        this.party.game = this.formulario.value.game;
        this.party.activity = null;
        this.party.social = null;
      } else if (partyType === 'Activity') {
        this.party.game = null;
        this.party.activity = this.formulario.value.activity;
        this.party.social = null;
      } else if (partyType === 'Social') {
        console.log(partyType);
        this.party.game = null;
        this.party.activity = null;
        console.log(this.party.social);
        this.party.social = this.formulario.value.social;
      }

      console.log(this.party);
      this.submitParty();
    } else {
      console.log("error envio")
    }
  }

  // Function to submit post
  submitParty() {
    this.party.creator.id = this.userId;
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
