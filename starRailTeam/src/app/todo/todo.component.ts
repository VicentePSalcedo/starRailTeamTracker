import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
    @Input() todoKey!: any;
    @Input() todoData!: any;
 
  ngOnInit(): void {
  }
  // ngOnInit(): void {
  //   if (this.isArray(this.todoData)) {
  //     this.stat = this.todoData[0];
  //   } else if (this.isObject(this.todoData)) {
  //     this.stat = this.todoData[this.todoKey];
  //   }
  // }

  // isArray(data: TodoData): data is string[] {
  //   return Array.isArray(data);
  // }

  // isObject(data: TodoData): data is {[key: string]: any} {
  //   return typeof data === 'object' && data !== null && !Array.isArray(data);
  // }
}
