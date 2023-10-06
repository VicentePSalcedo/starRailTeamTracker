import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FirestoreService } from '../firestore.service';
import { characterType } from '../Models/character.model';


@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
})
export class CardHolderComponent implements OnInit {
  allCharacters!: characterType[];
  displayedCharacters: characterType[] = [];

  constructor(private dataService: DataService, private fireStoreService: FirestoreService) {
    
  }

  testClick() {
    this.dataService.AddCharacter("Arlan");
    console.log(this.displayedCharacters);
  }

  ngOnInit(): void {
    this.dataService.displayedCharacters$.subscribe(data => {
      this.displayedCharacters = data;
    });
    }
}
