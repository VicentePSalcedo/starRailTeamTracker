import { Component, Input, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { KeyValuePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [TodoComponent, NgFor, KeyValuePipe]
})
export class SectionComponent implements OnInit{
  @Input({required: true}) artifactName!: string;
  @Input({required: true}) todoData!: any
  @Input({required: true}) characterName!: string ;
  @Input() set!: string;


  isArray(): boolean{
    return Array.isArray(this.todoData)
  }


  ngOnInit(): void {
    // console.log(this.todoData)
  }

}
