import { User } from '../../models/user/user';
import { UserActions, UserActionTypes, GetUserComplete, UpdateUserComplete, ResetDefaultOnDeleteComplete } from './user.actions';

export interface UserState extends User {
    
}

export function userReducer(state: UserState = {}, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.GetUserComplete:
            const getUser = action as GetUserComplete;
            const newState = { ...state, ...getUser.user };
            return newState;
        case UserActionTypes.UpdateUserComplete:
            const updateUser = action as UpdateUserComplete;
            return { ...state, ...updateUser.user };
        case UserActionTypes.ResetDefaultOnDeleteComplete: {
            const defaultList = action as ResetDefaultOnDeleteComplete;
            return { ...state, default_list_id: defaultList.updatedDefaultId };
        }
        default:
            return state;
    }
}