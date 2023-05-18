import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemecompComponent } from './components/memecomp/memecomp.component';
import { NavbarComponent } from './components/navbars/navbar/navbar.component';
import { MininavbarComponent } from './components/navbars/mininavbar/mininavbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    MemecompComponent,
    NavbarComponent,
    FooterComponent,
    MainFeedComponent,
    MininavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
