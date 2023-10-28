import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-character-button',
  templateUrl: './character-button.component.html',
  styleUrls: ['./character-button.component.scss'],
})
export class CharacterButtonComponent {
  @Input() name!: string;
  @Input() index!: number;
  characterIsSelected(name: string): boolean {
    if (this.dataService.checkIfCharacterInTeam(this.name)) {
      return true;
    } else {
      return false;
    }
  }
  constructor(private dataService: DataService) {}
}
