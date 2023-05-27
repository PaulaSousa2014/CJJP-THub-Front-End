import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent  implements OnInit{

  private _usuarioSeleccionado: string = "";
  private _partySeleccionada: string = "";
  messages: any[] = [];
  user: any;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService,private messagesService: MessagesService) { }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getMessages();
  }

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


  getMessages() {
    this.messagesService.getMessages().subscribe(
      (messages: any[]) => {
        this.messages = messages;
      },
      (error) => {
        console.log('Error retrieving messages:', error);
      }
    );
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
