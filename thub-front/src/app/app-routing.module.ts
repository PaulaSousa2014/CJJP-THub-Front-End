import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { PartiesComponent } from './components/parties/parties.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreatepartyComponent } from './components/createparty/createparty.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landingpage',
    pathMatch: 'full'
  },
  {
    path: 'landingpage',
    component: LandingComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainFeedComponent
  },
  {
    path: 'parties',
    component: PartiesComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'createparty',
    component: CreatepartyComponent
  },
  {
    path:'editeprofile',
    component: EditprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
