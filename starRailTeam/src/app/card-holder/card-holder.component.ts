import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { characterType } from '../Models/character.model';


@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent implements OnInit{
  selectedCharacterList$!: Observable<characterType[]>;
  
  constructor(private dataService: DataService, private fireStoreService: FirestoreService){
  }
  private _behaviorCharacter: BehaviorSubject<characterType[]> = new BehaviorSubject<characterType[]>([]);
  get behaviorCharacter$(): Observable<characterType[]>{
    return this._behaviorCharacter.asObservable()
  }
  
  ngOnInit(): void {
    this.selectedCharacterList$ = this.dataService.selectedCharactersData$;
    this.selectedCharacterList$.subscribe(data => {
      console.log(data)
    })
    this.fireStoreService.characterData$.subscribe(data => {
      this._behaviorCharacter.next(data);
    })
    
  }
  testClick(){
    this.dataService.AddCharacter("Silver Wolf");
  }
}
