import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { characterType } from '../Models/character.model';
import { DataService } from '../services/data.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
  standalone: true,
  imports: [TutorialComponent, CardComponent]
})
export class CardHolderComponent implements OnInit {
  displayedCharacters: characterType[] = [];

  constructor(private dataService: DataService) {}

  getCharacterLength(): number{
    return this.displayedCharacters.length
  }

  ngOnInit(): void {
    this.dataService.displayedCharacters$.subscribe(data => {
      this.displayedCharacters = data;
    });
  }
}
