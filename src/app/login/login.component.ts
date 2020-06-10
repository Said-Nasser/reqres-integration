import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(public authService: AuthService, public router: Router) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'),
      ])),
      password: new FormControl('', Validators.required)
    })
  }






  login(creds) {
    this.authService.login(creds).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Redirect the user
        this.router.navigate(['/admin']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}