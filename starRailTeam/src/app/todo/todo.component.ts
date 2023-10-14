import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
    @Input() todoKey!: any;
    @Input() todoData!: any;

    checkboxID!: string;

    assignCheckBoxId(): void{
      this.checkboxID = crypto.randomUUID();
    }

    ngOnInit(): void {
        this.assignCheckBoxId();
    }
}
