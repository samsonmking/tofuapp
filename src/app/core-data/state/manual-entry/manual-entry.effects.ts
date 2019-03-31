import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ManualEntryActionTypes, EntrySubmitted, RecipeCreated } from './manual-entry.actions';
import { ManualRecipeEntryState } from './manual-entry.reducer';
import { map } from 'rxjs/operators';
import { ManualEntryService } from '../../services/manual-entry/manual-entry.service';

@Injectable({providedIn: 'root'})
export class ManualEntryEffects {
    @Effect()
    formSubmitted$ = this.dataPersistence.pessimisticUpdate(ManualEntryActionTypes.EntrySubmitted, {
        run: (action: EntrySubmitted, state: ManualRecipeEntryState) => {
            return this.service.submitNewRecipe(action.payload).pipe(map(res => new RecipeCreated(res.id)));
        },

        onError: (action: EntrySubmitted, error) => {
            console.log('Error', error);
        }
    });

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ManualRecipeEntryState>,
        private service: ManualEntryService
    ) {}
}
