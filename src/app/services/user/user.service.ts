import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user/user';
import { tap } from 'rxjs/operators';

@Injectable({
  	providedIn: 'root'
})
export class UserService {

	SERVER_URL = 'http://localhost:4100'

	constructor(private http: HttpClient) { }

	storeUser(userFormValue: any) : Observable<void>{
		// console.log("User service: ", userFormValue);
		return this.http.post<void>(`${this.SERVER_URL}/user`, userFormValue);
	} 

	getLatestUser() : Observable<User>{
		return this.http.get<User>(`${this.SERVER_URL}/user`).pipe(
			tap((res) => {console.log("THIS IS SERVICE: ",res)})
		);
	}

}
