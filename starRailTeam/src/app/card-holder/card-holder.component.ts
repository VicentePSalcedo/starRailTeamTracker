import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent implements OnInit{
  
  selectedCharacters$: Observable<String[]>;

  constructor(private dataService: DataService){
    // this._currentCharacters = dataService;
    this.selectedCharacters$ = this.dataService.selectedCharacters$;
  }

  ngOnInit(){

  }
}
