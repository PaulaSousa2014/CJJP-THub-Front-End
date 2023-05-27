import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  selectedPartyId: number = 0;

  //@Input()
  //contactos: { id: number; nombre: string; }[] = [];
  @Input()
  parties: { id: number; title: string; }[] = [];
  private _selectedTab!: string;


  @Input()
  set selectedTab(value: string) {
    this._selectedTab = value;
  }
  get selectedTab(): string {
    return this._selectedTab;
  }

  @Output() partySelected: EventEmitter<number> = new EventEmitter<number>();
  constructor(

    private router: Router,
  ) {}



  partySeleccionada!: string;
  seleccionarParty(party: string, id: number) {
    this.partySeleccionada = party;
    this.selectedPartyId = id;
    console.log('ID de la party seleccionada:', id); // Imprimir la ID de la fiesta seleccionada en la consola
    this.partySelected.emit(id); // Emitir el ID de la fiesta seleccionada
  }

}
