import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit{
  @Input({required: true}) name!: string;
  @Input() set!: string;
  @Input({required: true}) todoData!: object

  objectKeys(obj: object): string[]{
    return Object.keys(obj)
  }

  ngOnInit(): void {
    console.log(this.todoData)
  }

}
