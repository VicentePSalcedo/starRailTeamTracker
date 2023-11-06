import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamselectComponent } from './teamselect.component';

describe('TeamselectComponent', () => {
  let component: TeamselectComponent;
  let fixture: ComponentFixture<TeamselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamselectComponent]
    });
    fixture = TestBed.createComponent(TeamselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
