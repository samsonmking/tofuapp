import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeThumbComponent } from './recipe-thumb.component';

describe('RecipeThumbComponent', () => {
  let component: RecipeThumbComponent;
  let fixture: ComponentFixture<RecipeThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
