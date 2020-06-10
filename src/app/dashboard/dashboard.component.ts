import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.dashboardService.getUsers().subscribe(res => {
      this.users = res
    })

  }
  logout() {
    this.authService.logout()
  }

}

interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}