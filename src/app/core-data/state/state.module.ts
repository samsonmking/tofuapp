import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { reducers } from '.';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManualEntryEffects } from './manual-entry/manual-entry.effects';
import { NxModule } from '@nrwl/nx';
import { ServicesModule } from '../services/services.module';
import { RecipesEffects } from './recipe/recipes.effects';
import { IngredientEffects } from './ingredient/ingredient.effects';
import { UserEffects } from './user/user.effects';
import { ShoppingListEffects } from './shopping-list/shopping-list.effects';
import { ShoppingListItemEffects } from './shopping-list-item/shopping-list-items.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './custom-route-serializer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([
      ManualEntryEffects,
      RecipesEffects,
      IngredientEffects,
      UserEffects,
      ShoppingListEffects,
      ShoppingListItemEffects
    ]),
    ServicesModule
  ]
})
export class StateModule { }
