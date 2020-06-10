import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API: string = 'https://reqres.in/api';
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dashboardService: DashboardService,
  ) { }

  login(creds) {
    return this.httpClient.post(`${this.API}/login`, creds)
      .pipe(
        map(res => {
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true')
          return res
        }),
        catchError(this.handleError)
      )
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/login'])
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.message)
    this.dashboardService.sendNotification(null, 'ERROR')
    return throwError('A data error occurred, please try again.')
  }
}
