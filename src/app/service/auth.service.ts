import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  private loggedIn = false;
  private loginUrl = 'http://localhost:8080/api/';
  // private options = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    
  // };


  // login(username: string, password: string): Observable<any> {
  //   let body = `username=${username}&password=${password}`;
  //   return this.http
  //   .post(AUTH_API + 'login',body, this.options);
  // }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }
}
