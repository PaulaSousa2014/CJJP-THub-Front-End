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
  constructor(

    private router: Router,
  ) {}

  /*usuarioSeleccionado!: string;
  seleccionarUsuario(usuario: string) {
    this.usuarioSeleccionado = usuario;
  }
*/
idparty(id: number) {
  this.router.navigate(['chat/', id]);
  console.log(id);
}

  partySeleccionada!: string;
  seleccionarParty(party: string, id: number) {
    this.partySeleccionada = party;
    this.selectedPartyId = id;
  }



}
