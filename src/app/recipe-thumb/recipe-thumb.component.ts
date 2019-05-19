import { Component, OnInit, Input } from '@angular/core';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';

@Component({
  selector: 'app-recipe-thumb',
  templateUrl: './recipe-thumb.component.html',
  styleUrls: ['./recipe-thumb.component.css']
})
export class RecipeThumbComponent implements OnInit {
  @Input() recipe: DisplayRecipe;

  constructor() { }

  ngOnInit() {
  }

}
