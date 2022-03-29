import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../interfaces/user/user";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  SERVER_URL = "http://localhost:4100";
  noAuthHeader = { headers: new HttpHeaders({ 'No-Auth': 'True'})};

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<void> {
    return this.http.post<void>(`${this.SERVER_URL}/user`, userData, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(
      `${this.SERVER_URL}/user/authenticate`,
      authCredentials,
      this.noAuthHeader
    );
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getUserProfile() {
    return this.http.get(`${this.SERVER_URL}/user/profile`).pipe(map((res) => res["data"]));
  }

  getLatestUser(): Observable<User> {
    return this.http
      .get<User>(`${this.SERVER_URL}/user`)
      .pipe(map((res) => res["data"]));
  }

  getListOfUsers(): Observable<User[]> {
    return this.http
      .get<any>(`${this.SERVER_URL}/users`)
      .pipe(map((res) => res["data"]));
  }

  getUserById(userId: string): Observable<User> {
    return this.http
      .get<User>(`${this.SERVER_URL}/user/${userId}`)
      .pipe(map((res) => res["data"]));
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.SERVER_URL}/user/${userId}?_method=DELETE`
    );
  }
}
