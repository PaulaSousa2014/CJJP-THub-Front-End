import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemecompComponent } from './memecomp/memecomp.component';
import { ChatComponent } from './chat/chat.component';
import { ContactsComponent } from './chat/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    MemecompComponent,
    ChatComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
