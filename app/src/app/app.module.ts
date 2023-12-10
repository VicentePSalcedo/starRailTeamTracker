import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { CardComponent } from './card/card.component';
import { SectionComponent } from './section/section.component';
import { TodoComponent } from './todo/todo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharacterButtonComponent } from './sidebar/character-button/character-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RemoveAddsButtonComponent } from './remove-adds-button/remove-adds-button.component';
import { HeaderComponent } from './header/header.component';

import { getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { ReCaptchaV3Provider, initializeAppCheck, provideAppCheck } from '@angular/fire/app-check';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { StripeModule } from "stripe-angular"
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { AdsenseModule } from 'ng2-adsense';
import { LoadingComponent } from './sidebar/loading/loading.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: "privacy", component: PrivacyComponent},
  {path: "", component: HomeComponent},
  {path: "404", component: HomeComponent},
  {path: "**", component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardComponent,
    SectionComponent,
    TodoComponent,
    SidebarComponent,
    CharacterButtonComponent,
    LoginButtonComponent,
    RemoveAddsButtonComponent,
    HeaderComponent,
    TeamSelectorComponent,
    LoadingComponent,
    TutorialComponent,
    PrivacyComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AdsenseModule.forRoot(),
    provideAuth(() => getAuth()),
    [ StripeModule.forRoot(environment.stripe.publicKey) ],
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
