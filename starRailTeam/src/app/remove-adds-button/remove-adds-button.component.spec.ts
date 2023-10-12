import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAddsButtonComponent } from './remove-adds-button.component';

describe('RemoveAddsButtonComponent', () => {
  let component: RemoveAddsButtonComponent;
  let fixture: ComponentFixture<RemoveAddsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveAddsButtonComponent]
    });
    fixture = TestBed.createComponent(RemoveAddsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
