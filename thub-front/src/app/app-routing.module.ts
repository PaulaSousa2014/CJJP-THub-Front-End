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
import { AboutUsComponent } from './components/about-us/about-us.component';

import { Error404Component } from './components/error404/error404.component';

import { FaqComponent } from './components/faq/faq.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './components/terms-service/terms-service.component';
import { ClickPartyComponent } from './components/click-party/click-party.component';
import { AvatarsComponent } from './components/avatars/avatars.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

import { AuthGuard } from './_helpers/AuthGuard';

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
    component: MainFeedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parties',
    component: PartiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:showData',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parties/id/:id',
    component: ClickPartyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createparty',
    component: CreatepartyComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'editprofile',
    component: EditprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'about',
    component: AboutUsComponent
  },
  {
    path:'faq',
    component: FaqComponent
  },
  {
    path:'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path:'service',
    component: TermsServiceComponent
  },
  {
    path: 'clickparty',
    component: ClickPartyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'avatars',
    component: AvatarsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
