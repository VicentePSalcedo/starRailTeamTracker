import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
    @Input() todoKey!: any;
    @Input() todoData!: any;

    checkboxID: string = this.returnUUID();
    sectionID: string = this.returnUUID();

    returnUUID(): string{
      return crypto.randomUUID();
    }
    toggleSectionCheckBox(event: Event, stat: string, Id: string){
      const sectionElement = document.getElementsByClassName(Id)
      if (sectionElement.length <= 1) return;
      for(const x of sectionElement){
        if(x instanceof HTMLInputElement && x.value != stat){
         x.checked = false; 
        }
      }
    }

    ngOnInit(): void {
      console.log(this.todoData)
    }
}
