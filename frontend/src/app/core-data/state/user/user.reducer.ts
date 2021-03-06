import {
    UserActions,
    UserActionTypes,
    LoginComplete,
    RegisterComplete,
    LoadUserComplete
} from './user.actions';
import { User } from '../../models/user/user';

export interface UserState {
    loggedIn: boolean;
    user?: User;
}

export function userReducer(state: UserState = { loggedIn: false }, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.LoginComplete: {
            const loginAction = action as LoginComplete;
            return { ...state,
                loggedIn: true, 
                user: loginAction.user,
            };
        }

        case UserActionTypes.LogoutComplete: {
            return { loggedIn: false }
        }

        case UserActionTypes.RegisterComplete: {
            const registerAction = action as RegisterComplete;
            return { ...state,
                loggedIn: true,
                user: registerAction.user
            }
        }

        case UserActionTypes.LoadUserComplete: {
            const loadAction = action as LoadUserComplete;
            return { ...state, ...loadAction.userData, loggedIn: true }
        }

        default:
            return state;
    }
}