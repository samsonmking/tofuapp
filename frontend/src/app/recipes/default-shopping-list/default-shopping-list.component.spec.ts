import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultShoppingListComponent } from './default-shopping-list.component';

describe('DefaultShoppingListComponent', () => {
  let component: DefaultShoppingListComponent;
  let fixture: ComponentFixture<DefaultShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
