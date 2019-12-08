import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailDialogComponent } from './recipe-detail-dialog.component';

describe('RecipeDetailDialogComponent', () => {
  let component: RecipeDetailDialogComponent;
  let fixture: ComponentFixture<RecipeDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
