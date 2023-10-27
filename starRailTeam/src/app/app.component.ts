import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
import { TeamsService } from './services/teams.service';
import { characterType } from './Models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starRailTeam';
  teams!: characterType[][];
  constructor(private fireStoreService: FirestoreService, private teamsService: TeamsService){
  }
}



