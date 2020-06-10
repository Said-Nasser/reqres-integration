import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DashboardService } from '../dashboard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  form: FormGroup;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }
  ngOnInit() {
    this.getUser()
  }
  setupForm() {
    this.form = new FormGroup({
      first_name: new FormControl(this.user.first_name, Validators.required),
      last_name: new FormControl(this.user.last_name, Validators.required),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'),
      ])),
      avatar: new FormControl(this.user.avatar, Validators.required)
    })
  }


  getUser(): void {
    this.dashboardService.getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe(user => {
        this.user = user
        this.setupForm()
      });
  }
  goBack(): void {
    this.location.back();
  }
  save(user): void {
    this.dashboardService.updateUser({ ...user, id: this.user.id })
      .subscribe(res => {
        this.dashboardService.sendNotification(user, 'UPDATE')
        this.router.navigate(['admin'])
      });
  }
  delete(): void {
    this.dashboardService.deleteUser(this.user)
      .subscribe(() => {
        this.dashboardService.sendNotification(this.user, 'DELETE')
        this.router.navigate(['admin'])
      });
  }

}

interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}