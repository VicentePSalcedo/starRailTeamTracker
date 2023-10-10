import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit{
  @Input({required: true}) name!: string;
  @Input() set!: string;
  @Input({required: true}) todoData!: object | string

  objectKeys(obj: object | string): string[]{
    if(typeof obj === 'object' && obj !== null){
      return Object.keys(obj)
    } else
    return []
  }

  isString(val: object | string) : boolean{
    if(typeof val === 'string') return true
    return false;
  }


  typeOfTodo(todo: String | object): string{
    return typeof todo;
  }

  ngOnInit(): void {
    console.log(this.todoData)
  }

}
