import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcheckComponent } from './appcheck.component';

describe('AppcheckComponent', () => {
  let component: AppcheckComponent;
  let fixture: ComponentFixture<AppcheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppcheckComponent]
    });
    fixture = TestBed.createComponent(AppcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
