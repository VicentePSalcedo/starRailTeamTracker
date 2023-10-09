import { Component, Input, OnInit } from '@angular/core';

interface TodoData {
  [key: string]: any
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  @Input() todoKey!: string;
  @Input() todoData!: TodoData;

  stat!: string[];

  ngOnInit(): void {
      this.stat = this.todoData[this.todoKey]
      console.log(this.stat)
  }

}
