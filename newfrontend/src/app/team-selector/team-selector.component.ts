import { Component } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { characterType } from '../Models/character.model';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss'],
  standalone: true,

})
export class TeamSelectorComponent {

  teams!: characterType[][];
  constructor(private teamsService: TeamsService){
  this.teamsService.teams$.subscribe(data => {
    this.teams = data
  })
  }
  nextTeam(): void{
    this.teamsService.changeTeams(this.teamsService.currentTeam + 1)
  }
  prevTeam(): void{
    this.teamsService.changeTeams(this.teamsService.currentTeam - 1)
  }
  getTeamIndex(){
    return this.teamsService.currentTeam + 1;
  }
  getMaxTeamIndex(){
    return this.teams.length;
  }

}
