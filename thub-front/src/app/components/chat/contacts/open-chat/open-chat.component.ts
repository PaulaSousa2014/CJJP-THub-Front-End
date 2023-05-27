import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, Party, Sender } from 'src/app/models/MessageModels';
import { MessagesService } from 'src/app/services/message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent {

  private _partySeleccionada: string = "";

  messages: any[] = [];
  sender: Sender = {} as Sender;
  party: Party = {} as Party;
  message: Message = {} as Message;
  currentUser = this.tokenStorage.getUser();

  @Input() partyId: number = 0;


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
    private tokenStorage: TokenStorageService) {
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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

  }
  // Function to get posts and get likes/comments
  getAllMessages() {
    this.messagesService.getMessage().subscribe({
      next: (data: any) => {
        console.log('getting posts');
        this.messages = data;
        console.log("Mensajes:" + this.messages);

        this.sortPostsByTimestamp(); // Sort the posts by timestamp
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

        console.log("Datadentrosubmit" + data);
        location.reload(); // Reload the page after successfully submitting the post
      },
      error: (error: any) => {
        console.log(this.message);
        console.log('Cannot post message', error);
      },
    });
    this.getAllMessages();
  }

  // Function to format the timestamp of a post
  formatTimestamp(serverTimestamp: string): string {
    const serverTime = new Date(serverTimestamp + 'Z'); // Add 'Z' for UTC time zone offset
    const localTime = new Date(); // Local datetime

    const timeDiff = Math.floor(
      (localTime.getTime() - serverTime.getTime()) / 1000
    ); // Time difference in seconds

    if (timeDiff < 60) {
      return `< 1 minute ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minutes ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours} hours ago`;
    } else {
      // Format the date and time in the user's local time
      const formattedDate = serverTime.toLocaleString();
      return formattedDate;
    }
  }

  // Function to sort posts by timestamp
  sortPostsByTimestamp() {
    this.messages.sort((a, b) => {
      const timestampA = new Date(a.time_submitted);
      const timestampB = new Date(b.time_submitted);
      return timestampB.getTime() - timestampA.getTime();
    });
  }



}
