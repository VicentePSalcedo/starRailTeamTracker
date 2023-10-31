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
import { TeamselectComponent } from './teamselect/teamselect.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RemoveAddsButtonComponent } from './remove-adds-button/remove-adds-button.component';
import { HeaderComponent } from './header/header.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { StripeModule } from "stripe-angular"

@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardComponent,
    SectionComponent,
    TodoComponent,
    SidebarComponent,
    CharacterButtonComponent,
    TeamselectComponent,
    LoginButtonComponent,
    RemoveAddsButtonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    [ StripeModule.forRoot(environment.stripe.publicKey) ],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
