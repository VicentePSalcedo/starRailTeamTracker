import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent {
  teamSize: number[] = [];
  constructor(ds: DataServiceService){
    this.teamSize = Array(ds.MAX_TEAM_SIZE).fill(0);
  }

}
