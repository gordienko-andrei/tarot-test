import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwncardsComponent } from './owncards.component';

describe('OwncardsComponent', () => {
  let component: OwncardsComponent;
  let fixture: ComponentFixture<OwncardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwncardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwncardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
