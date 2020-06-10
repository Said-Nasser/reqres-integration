import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  form: FormGroup
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'),
      ])),
      avatar: new FormControl('', Validators.required)
    })
  }

  createUser(user): void {
    this.dashboardService.createUser(user)
      .subscribe(user => {
        this.dashboardService.sendNotification(user, 'CREATE')
        this.goBack()
      });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
  

}


interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}