import { DatePipe } from '@angular/common';
import { Component, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, Sender } from 'src/app/models/MessageModels';
import { MessagesService } from 'src/app/services/message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Party } from 'src/app/models/PartyModels';
@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent implements AfterViewChecked {

  @ViewChild('chatContainer', { static: false }) chatContainerRef!: ElementRef;

  private _partySeleccionada: string = "";
  @Input() partyId: number = 0;

  messages: any[] = [];
  sender: Sender = {} as Sender;
  party: Party = {} as Party;
  message: Message = {} as Message;
  currentUser = this.tokenStorage.getUser();

  @Input()
  set partySeleccionada(value: string) {
    this._partySeleccionada = value;
  }
  get partySeleccionada(): string {
    return this._partySeleccionada;
  }
  private _status: number = 0;
  open() {
    this._partySeleccionada = "";
    this._status = 0;
  }

  constructor(private router: Router,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private tokenStorage: TokenStorageService, private elementRef: ElementRef) {

  }


  ngOnInit(): void {

    // Get party id from route
    const partyId = parseInt(this.partySeleccionada, 10);
    if (!isNaN(partyId)) {
      this.partyId = partyId;
    } else {
      // Handle the case when partySeleccionada is not a valid number
      // For example, you can display an error message or set a default value
      console.error('Invalid partyId:', this.partySeleccionada);
      // Set a default partyId value:
      // this.partyId = 0;
    }
    this.getAllMessages();
    this.getPartyIdMessages();


  }
  // Function to get posts and get likes/comments
  getAllMessages() {
    this.messagesService.getMessage().subscribe({
      next: (data: any) => {
        console.log('getting posts');
        this.messages = data; //here ir where the message array is.
        console.log( this.messages);

      },
      error: (error: any) => {
        console.log('Cannot get posts', error);
      },
    });
  }

  // Function to submit a new post
  submitMessage() {
    this.sender.id = this.currentUser.id;
    this.message.sender = this.sender;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    this.message.time_submitted = formattedDate;
    this.message.party = { id: this.partyId };

    console.log('button pressed');
    console.log(this.message);

    this.messagesService.postMessage(this.message).subscribe({
      next: (data: any) => {
        console.log('Datadentrosubmit' + data);
        this.message.content = '';
        // Autorefresh después de enviar el mensaje
      this.getPartyIdMessages();

      // Autorefresh después de 30 segundos
      setTimeout(() => {
        this.getPartyIdMessages();
      }, 10000);
    },
      error: (error: any) => {
        console.log(this.message);
        console.log('Cannot post message', error);
      },
    });
    this.getPartyIdMessages();
    this.loadMessageHistory();
  }

  getPartyIdMessages() {
    this.messagesService.getMessageByPartyId(this.partyId).subscribe({
      next: (data: any) => {
        console.log('getting partyid');
        this.messages = data; // Asigna los mensajes a this.messages
        console.log('party id: ' + this.partyId);
        console.log('messages: ', this.messages);

      },
      error: (error: any) => {
        console.log('Cannot get posts', error);
      },
    });
  }

  onPartySelected(partyId: number) {
    this.partyId = partyId; // Obtener el ID de la fiesta seleccionada
    // Realizar las acciones necesarias con el nuevo partyId
  }

  loadMessageHistory(): void {
    // Llama al servicio para obtener el historial de mensajes
    this.messagesService.getMessage().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error: any) => {
        console.error('Error al cargar el historial de mensajes:', error);
      }
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatContainer = this.elementRef.nativeElement.querySelector('.container');
    chatContainer.classList.add('scroll-bottom');
  }

}
