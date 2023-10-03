import { Component, Input } from '@angular/core';
import { characterType } from '../Models/character.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() character!: characterType;

  constructor(){
    console.log(this.character)
  }
}
