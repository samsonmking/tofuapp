import { User } from '../../models/user/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserData } from '../../models/user/user-data';

@Injectable({ providedIn: ServicesModule })
export class UserService {
    constructor(private readonly http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<UserData>(`http://localhost:3000/login`, { username, password }).pipe(
            take(1)
        );
    }
}