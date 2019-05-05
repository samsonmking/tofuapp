import { Component, OnInit } from '@angular/core';
import { RecipeFacade } from '../core-data/state/recipies/recipes.facade';
import { Observable } from 'rxjs';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<DisplayRecipe[]>;

  constructor(private fascade: RecipeFacade) { }

  ngOnInit() {
    this.recipes$ = this.fascade.recipes$;
    this.fascade.getAllRecipes();
  }
}
