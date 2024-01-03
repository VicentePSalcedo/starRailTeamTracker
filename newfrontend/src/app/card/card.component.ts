import { Component, Input, OnInit } from '@angular/core';
import { characterType } from '../Models/character.model';
import { SectionComponent } from '../section/section.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [SectionComponent]
})
export class CardComponent{
  @Input() character!: characterType;


  constructor(){
  }
}
