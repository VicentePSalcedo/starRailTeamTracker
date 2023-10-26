import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { characterType } from '../Models/character.model';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
})
export class CardHolderComponent implements OnInit {
  displayedCharacters: characterType[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.displayedCharacters$.subscribe(data => {
      this.displayedCharacters = data;
    });
  }
}
