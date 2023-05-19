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
