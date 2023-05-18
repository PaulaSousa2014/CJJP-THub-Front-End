import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent {

  private _usuarioSeleccionado: string = "";
  @Input()
  set usuarioSeleccionado(value: string) {
    this._usuarioSeleccionado = value;
  }
  get usuarioSeleccionado(): string {
    return this._usuarioSeleccionado;
  }

}
