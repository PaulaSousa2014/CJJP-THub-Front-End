import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Party, Creator, Activity, Game, Social} from 'src/app/models/CreatePartyModels';
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
  social: Social = {} as Social;
  party: Party = { title: '', description: '', creator: this.creator, activity: this.activity, game: this.game, social: this.social };
  user: any = this.tokenStorageService.getUser();
  userId = this.user.id;

  constructor(private createPartyService: CreatepartyService, private tokenStorageService: TokenStorageService) {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      partyType: new FormControl('', Validators.required)
    });

    this.party.game = {} as Game; // Inicializar como objeto vacío
    this.party.activity = {} as Activity; // Inicializar como objeto vacío
    this.party.social = {} as Social; // Inicializar como objeto vacío
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
        const selectedGameId = this.formulario.value.game; // Obtener la id seleccionada
        this.party.game = selectedGameId ? { id: selectedGameId } : {} as Game; // Asignar la id si está seleccionada, de lo contrario, asignar objeto vacío

      } else if (partyType === 'Activity') {
        const selectedActivityId = this.formulario.value.activity; // Obtener la id seleccionada
        this.party.activity = selectedActivityId ? { id: selectedActivityId } : {} as Activity; // Asignar la id si está seleccionada, de lo contrario, asignar objeto vacío

      } else if (partyType === 'Social') {
        const selectedSocialId = this.formulario.value.social; // Obtener la id seleccionada
        this.party.social = selectedSocialId ? { id: selectedSocialId } : {} as Social; // Asignar la id si está seleccionada, de lo contrario, asignar objeto vacío
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
