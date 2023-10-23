import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { dataType } from '../Models/character.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
    @Input() todoKey!: any;
    @Input() todoData!: any;
    @Input({required: true}) data!: any;

    checkboxID: string = this.returnUUID();
    sectionID: string = this.returnUUID();

    constructor(private dataService: DataService){

    }

    returnUUID(): string{
      return crypto.randomUUID();
    }
    toggleSectionCheckBox(event: Event, stat: string, Id: string, index: number){
      const sectionElement = document.getElementsByClassName(Id)
      this.dataService.updateChecked(this.data.CharacterName, this.data.ArtifactName, this.data.EquipmentType, index);
      if (sectionElement.length <= 1) return;
      for(const x of sectionElement){
        if(x instanceof HTMLInputElement && x.value != stat){
         x.checked = false; 
        }
      }
    }

    ngOnInit(): void {
      // console.log(this.todoData)
    }
}
