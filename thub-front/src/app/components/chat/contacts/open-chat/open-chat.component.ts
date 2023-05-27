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
  set partySeleccionada(value: string) {
    this._partySeleccionada = value;
  }
  get partySeleccionada(): string {
    return this._partySeleccionada;
  }
  @Input()
  set usuarioSeleccionado(value: string) {
    this._usuarioSeleccionado = value;
  }
  get usuarioSeleccionado(): string {
    return this._usuarioSeleccionado;
  }


  private _status: number = 0;
  open() {
    this._partySeleccionada = "";
    this._usuarioSeleccionado = "";
    this._status = 0;
  }


  messages: {id: number, sender: string, receiver:string, message: string, hour: string}[] = [];
  constructor() {
    this.messages = [
      { id: 1, sender: 'Juan Pérez', receiver: 'me', message: "Hola!", hour: "11:00" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 2, sender: 'me', receiver: 'Juan Pérez', message: "Hi.", hour: "11:02" },
      { id: 3, sender: 'me', receiver: 'María García', message: "TEST.", hour: "05:00"},
    ];
  }

  public tieneMensajesDelUsuario(): boolean {
    return this.messages.some(message => message.sender === this.usuarioSeleccionado || message.receiver === this.usuarioSeleccionado);
  }

  newMessage: string = '';
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const newMsg = {
        id: this.messages.length + 1,
        sender: "ne",
        receiver: this.usuarioSeleccionado,
        message: this.newMessage,
        hour: "12:00"
      };
      this.messages.push(newMsg);
      this.newMessage = '';
    }
  }
}
