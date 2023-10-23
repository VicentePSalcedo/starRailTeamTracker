import { Component, OnDestroy, OnInit } from '@angular/core';
import { characterType } from '../Models/character.model';
import { FirestoreService } from '../firestore.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy{
  characterList!: characterType[];
  sidebarOpen: boolean = true;

  displayedCharacterSub!: Subscription;
  allCharactersSub!: Subscription;
  displayedCharacters!: characterType[];
  constructor(
    private firestoreService: FirestoreService,
    private dataService: DataService,
  ) {}

  getCharacterInArray(character: string): number{
    return this.displayedCharacters.findIndex(data => data.Name == character) + 1
  }

  toggleSidebar() {
    this.sidebarOpen = this.sidebarOpen ? false : true;
  }
  toggleCharacter(name: string) {
    if (
      !this.dataService.checkIfCharacterInTeam(name) && this.displayedCharacters.length < this.dataService.MAXTEAMSIZE
    ) {
      this.dataService.addCharacter(name);
    } else {
      this.dataService.removeCharacter(name);
    }
  }
  ngOnInit(): void {
    this.allCharactersSub = this.firestoreService.characterData$.subscribe((data) => {
      this.characterList = data;
    });
    if (this.dataService.selectedCharacters.length > 0) {
      this.sidebarOpen = false;
    }

    this.displayedCharacterSub = this.dataService.displayedCharacters$.subscribe(data => {
      this.displayedCharacters = data;
    })
  }

  ngOnDestroy(): void {
    this.displayedCharacterSub.unsubscribe();
    this.allCharactersSub.unsubscribe();
  }
  
}
