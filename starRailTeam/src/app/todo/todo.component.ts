import { Component, Input, OnInit } from '@angular/core';

type TodoData = {[key: string]: any} | string;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  @Input() todoKey!: string;
  @Input() todoData!: TodoData;

  stat!: string[] | string;

  isArray(stat: any): stat is any[]{
    return Array.isArray(stat);
  }

  ngOnInit(): void {
      if(typeof this.todoData === 'string'){
        this.stat = this.todoData;
      }else{
        this.stat = this.todoData[this.todoKey]
      }
      console.log(this.stat)
  }

}
