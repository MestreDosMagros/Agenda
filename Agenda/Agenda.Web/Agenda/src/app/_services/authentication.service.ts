import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public user_autenticated(): boolean {
        return this.currentUserValue != null;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        return this.http.post<User>(environment.baseUrl + '/user/login',
            JSON.stringify(user), { headers: this.headers })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    get headers(): HttpHeaders {
        var header = new HttpHeaders().set('content-type', 'application/json');

        if (this.user_autenticated())
            header.set('Authorization', 'bearer ' + this.currentUserValue.token);

        return header;
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(environment.baseUrl + '/user/register',
            JSON.stringify(user), { headers: this.headers });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}