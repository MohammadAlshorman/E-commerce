import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaststageforgetpasswordComponent } from './laststageforgetpassword.component';

describe('LaststageforgetpasswordComponent', () => {
  let component: LaststageforgetpasswordComponent;
  let fixture: ComponentFixture<LaststageforgetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaststageforgetpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaststageforgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
