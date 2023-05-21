import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MemecompComponent } from './components/memecomp/memecomp.component';
import { NavbarComponent } from './components/navbars/navbar/navbar.component';
import { MininavbarComponent } from './components/navbars/mininavbar/mininavbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { LoginComponent } from './components/login/login.component';
import { PartiesComponent } from './components/parties/parties.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginNavbarComponent } from './components/navbars/login-navbar/login-navbar.component';
import { CreatepartyComponent } from './components/createparty/createparty.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OtherprofileComponent } from './components/otherprofile/otherprofile.component';
import { Error404Component } from './components/error404/error404.component';
import { ClickPartyComponent } from './components/click-party/click-party.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactsComponent } from './components/chat/contacts/contacts.component';
import { OpenChatComponent } from './components/chat/contacts/open-chat/open-chat.component';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { FaqComponent } from './components/faq/faq.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    MemecompComponent,

    NavbarComponent,
    FooterComponent,
    MainFeedComponent,
    MininavbarComponent,
    LoginComponent,
    PartiesComponent,
    SignupComponent,
    LandingComponent,
    LoginNavbarComponent,
    CreatepartyComponent,
    ProfileComponent,
    OtherprofileComponent,
    Error404Component,
    ClickPartyComponent,
    EditprofileComponent,

    ChatComponent,
    ContactsComponent,
    OpenChatComponent,
    AboutUsComponent,
    FaqComponent,
    PrivacyPolicyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
