import { Component } from '@angular/core';
import { characterType } from '../Models/character.model';
import { FirestoreService } from '../firestore.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  characterList!: characterType[];
  sidebarOpen: boolean = true;
  constructor(private firestoreService: FirestoreService, private dataService: DataService) { }
  toggleSidebar() {
    this.sidebarOpen = this.sidebarOpen ? false : true;
  }
  toggleCharacter(name: string) {
    if (!this.dataService.selectedCharacters.includes(name) && (this.dataService.selectedCharacters.length < this.dataService.MAXTEAMSIZE)) {
      this.dataService.addCharacter(name);
    } else {
      this.dataService.removeCharacter(name);
    }
  }
  ngOnInit(): void {
    this.firestoreService.characterData$.subscribe(data => {
      this.characterList = data;
    });
    if (this.dataService.selectedCharacters.length > 0){
      this.sidebarOpen = false;
    }
  }
}

