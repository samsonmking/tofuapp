import { User } from '../../models/user/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';

@Injectable({ providedIn: ServicesModule })
export class UserService {
    constructor(private readonly http: HttpClient) {}

    getUser(id: string) {
        return this.http.get<User>(`http://localhost:3000/user/${id}`);
    }

    updateUser(user: User) {
        return this.http.put<User>(`http://localhost:3000/user/${user.id}`, user);
    }
}