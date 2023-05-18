import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemecompComponent } from './memecomp/memecomp.component';
import { LoginComponent } from './login/login.component';

import { PartiesComponent } from './parties/parties.component';

import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { CreatepartyComponent } from './createparty/createparty.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MemecompComponent,
    LoginComponent,

    PartiesComponent,

    SignupComponent,
    LandingComponent,
    CreatepartyComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
