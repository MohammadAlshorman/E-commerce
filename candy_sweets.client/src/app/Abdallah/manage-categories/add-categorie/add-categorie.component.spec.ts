import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorieComponent } from './add-categorie.component';

describe('AddCategorieComponent', () => {
  let component: AddCategorieComponent;
  let fixture: ComponentFixture<AddCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
