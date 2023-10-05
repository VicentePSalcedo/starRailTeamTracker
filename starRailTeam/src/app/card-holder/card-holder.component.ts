import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FirestoreService } from '../firestore.service';
import { characterType } from '../Models/character.model';


@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
})
export class CardHolderComponent implements OnInit{
  selectedCharacterList$!: characterType[];
  
  constructor(private dataService: DataService, private fireStoreService: FirestoreService){
    
  }
  
  ngOnInit(): void {
    this.fireStoreService.characterData$.subscribe(data => {
      this.selectedCharacterList$ = data;
    })
  }
  testClick(){
    this.dataService.AddCharacter("Silver Wolf");
    console.log(this.dataService.selectedCharacters);
    console.log(this.dataService.selectedCharactersData$);
  }
}
