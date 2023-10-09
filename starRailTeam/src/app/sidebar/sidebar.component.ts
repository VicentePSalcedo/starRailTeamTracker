import { Component } from '@angular/core';
import { characterType } from '../Models/character.model';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  characterList!: characterType[];
  constructor(private firestoreService: FirestoreService){}
  ngOnInit(): void {
    this.firestoreService.characterData$.subscribe(data => {
      this.characterList = data;
    });
  }
}

