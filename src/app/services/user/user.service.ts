import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user/user';
import { map, tap } from 'rxjs/operators';

@Injectable({
  	providedIn: 'root'
})
export class UserService {

	SERVER_URL = 'http://localhost:4100'

	constructor(private http: HttpClient) { }

	storeUser(userData: any) : Observable<void>{
		return this.http.post<void>(`${this.SERVER_URL}/user`, userData);
	} 

	getLatestUser() : Observable<User>{
		return this.http.get<User>(`${this.SERVER_URL}/user`).pipe(
			map((res) => res['data']),
		);
	}

	getListOfUsers() : Observable<User[]>{
		return this.http.get<any>(`${this.SERVER_URL}/users`).pipe(
			// tap((res) => {console.log("List of users - service: ", res)}),
			map((res) => res['data'])
		)
	}

	getUserById(userId: string) : Observable<User>{
		return this.http.get<User>(`${this.SERVER_URL}/user/${userId}`).pipe(
			map(res => res['data'])
		);
	}

	deleteUser(userId: string) : Observable<void>{
		return this.http.delete<void>(`${this.SERVER_URL}/user/${userId}?_method=DELETE`);
	}

}
