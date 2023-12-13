import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
import { TeamsService } from './services/teams.service';
import { characterType } from './Models/character.model';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'starRailTeam';
  teams!: characterType[][];
  constructor(private fireStoreService: FirestoreService, private teamsService: TeamsService){
  }
}



