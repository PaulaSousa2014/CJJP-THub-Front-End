import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent {

  private _usuarioSeleccionado: string = "";
  private _partySeleccionada: string = "";

  @Input()
  set usuarioSeleccionado(value: string) {
    this._usuarioSeleccionado = value;
  }
  get usuarioSeleccionado(): string {
    return this._usuarioSeleccionado;
  }

  @Input()
  set partySeleccionada(value: string) {
    this._partySeleccionada = value;
  }
  get partySeleccionada(): string {
    return this._partySeleccionada;
  }

  private _status: number = 0;
  open() {
    if(this._usuarioSeleccionado) {
      this._status = 1;
      this._partySeleccionada = "";
    } else {
      this._status = 2;
      this._usuarioSeleccionado = "";
    }
  }
}
