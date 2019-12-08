import { Injectable } from "@angular/core";
import { ServicesModule } from '../services.module';
import { UserData } from '../../models/user/user-data';

@Injectable({providedIn: ServicesModule})
export class UserStorage {
    saveUser(userState: UserData) {
        localStorage.setItem('user', JSON.stringify(userState));
    }

    getUser(): UserData | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    clear() {
        localStorage.clear();
    }
}