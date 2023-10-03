import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService implements OnInit{

  constructor(private fireStoreService: FirestoreService){}
  private _selectedCharacters: BehaviorSubject<String[]> = new BehaviorSubject<String[]>(["Kafka", "Silver Wolf"])
  get selectedCharacters$(): Observable<String[]>{
    return this._selectedCharacters.asObservable();
  }

  AddCharacter(characterName: String): void{
    this._selectedCharacters.next([...this._selectedCharacters.value, characterName])
  }

  private _selectedCharactersData: BehaviorSubject<characterType[]> = new BehaviorSubject<characterType[]>([]);
  get selectedCharactersData$(): Observable<characterType[]>{
    return this._selectedCharactersData.asObservable();
  }

  AddCharacterDataToArray(characterArray: String[]){
    // console.log(this.fireStoreService.snapshot);
  }

  ngOnInit(): void {
      this.selectedCharacters$.subscribe(data =>{
        next: this.AddCharacterDataToArray(data)
      })
  }



}
