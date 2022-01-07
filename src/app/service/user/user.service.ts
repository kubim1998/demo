import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

const API_URL = 'http://localhost:8080/api/admin/'

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'users');
  }

  delete(id: number){
    return this.http.delete(`${API_URL}users/delete/${id}`);
  }

  findByUsername(username: string): Observable<User>{
    return this.http.get<User>(`${API_URL}users/user/${username}`);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(`${API_URL}users/user/update`, user);
  }

  search(name: string): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'users/search?name=' + name);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL);
  }

  getAllUser(index: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'users/pagination?index=' + index);
  }

  countUsers(): Observable<any>{
    return this.http.get(API_URL + 'users/count');
  }
 }
