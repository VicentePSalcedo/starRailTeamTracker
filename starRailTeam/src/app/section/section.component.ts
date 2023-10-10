import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit{
  @Input({required: true}) name!: string;
  @Input({required: true}) todoData!: any
  @Input() set!: string;


  isArray(): boolean{
    return Array.isArray(this.todoData)
  }


  ngOnInit(): void {
    // console.log(this.todoData)
  }

}
