import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  API: string = 'https://reqres.in/api';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<Users>(`${this.API}/users`)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      )
  }

  getUser(id) {
    return this.httpClient.get<User>(`${this.API}/users/${id}`)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      )
  }

  updateUser(user) {
    return this.httpClient.put<UpdateUser>(`${this.API}/users/${user.id}`, user)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  createUser(user) {
    return this.httpClient.post<CreateUser>(`${this.API}/users`, user)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  deleteUser(user) {
    return this.httpClient.delete(`${this.API}/users/${user.id}`)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError('A data error occurred, please try again.')
  }





  sendNotification(user, operation) {
    if (document.querySelector('#notification').innerHTML !== '') {
      return false
    }
    document.querySelector('#notification').classList.add('show')
    switch (operation) {
      case 'CREATE':
        document.querySelector('#notification').innerHTML = `
              <b>${user.first_name} ${user.last_name}</b> is Added as a new user
            `
        break;
      case 'DELETE':
        document.querySelector('#notification').innerHTML = `
              <b>${user.first_name} ${user.last_name}</b> is deleted
            `
        break;
      case 'UPDATE':
        document.querySelector('#notification').innerHTML = `
              <b>${user.first_name} ${user.last_name}</b> is updated
            `
        break;
      case 'ERROR':
        document.querySelector('#notification').innerHTML = `
        A data error occurred, please try again.
            `
        break;
    }
    setTimeout(() => {
      document.querySelector('#notification').innerHTML = ''
      document.querySelector('#notification').classList.remove('show')
    }, 3000);
  }
}

export interface User {
  data: {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  }
}
export interface Users {
  data: User[]
}

export interface CreateUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
  createdAt: string
}
export interface UpdateUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
  updatedAt: string
}