import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { characterType } from '../Models/character.model';
import { FirestoreService } from '../services/firestore.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { CharacterButtonComponent } from './character-button/character-button.component';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CharacterButtonComponent, LoadingComponent]
})
export class SidebarComponent implements OnInit, OnDestroy{
  sidebarOpen: boolean = false;
  input: string = '';
  
  displayedCharacterSub!: Subscription;
  allCharactersSub!: Subscription;
  
  characterList!: characterType[];
  displayedCharacters!: characterType[];
  filteredCharacters!: characterType[];

  constructor(
    private firestoreService: FirestoreService,
    private dataService: DataService,
  ) {}

  filterList(e: Event): void{
    const input = (e.target as HTMLInputElement).value.toLowerCase();
    this.input = input;
    this.filteredCharacters = this.characterList.filter(data => (
      data.Name.toLowerCase().startsWith(input)
    ))
  }

  emptyInput(): void{
    this.input = '';
    this.filteredCharacters = this.characterList;

  }
  getCharacterInArray(character: string): number{
    return this.displayedCharacters.findIndex(data => data.Name == character) + 1
  }

  toggleSidebar() {
    this.sidebarOpen = this.sidebarOpen ? false : true;
    this.emptyInput()
  }
  toggleCharacter(name: string) {
    if (
      !this.dataService.checkIfCharacterInTeam(name) && this.displayedCharacters.length < this.dataService.MAXCHARACTERS
    ) {
      this.dataService.addCharacter(name);
    } else {      
      this.dataService.removeCharacter(name);
    }
  }
  ngOnInit(): void {
    this.allCharactersSub = this.firestoreService.characterData$.subscribe((data) => {
      this.characterList = data;
      this.filteredCharacters = data;
    });

    this.displayedCharacterSub = this.dataService.displayedCharacters$.subscribe(data => {
      this.displayedCharacters = data;
    })
    if (this.displayedCharacters.length > 0) {
      this.sidebarOpen = false;
    }

  }

  ngOnDestroy(): void {
    this.displayedCharacterSub.unsubscribe();
    this.allCharactersSub.unsubscribe();
  }
  
}
