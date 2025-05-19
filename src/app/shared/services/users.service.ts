import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private baseURL = 'https://jsonplaceholder.typicode.com/users';

  constructor() { }

  getAllUsers() {
    return this.http.get<User[]>(this.baseURL);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  createUser(userData: User) {
    return this.http.post<User>(
      this.baseURL,
      JSON.stringify(userData),
      {observe: 'response'}
    );
  }

  updateUser(id: number, userData: User) {
    return this.http.put<User>(
      `${this.baseURL}/${id}`,
      JSON.stringify(userData),
      {observe: 'response'}
    );
  }

  deleteUser(id: number) {
    return this.http.delete<User>(
      `${this.baseURL}/${id}`,
      {observe: 'response'}
    );
  }
}
