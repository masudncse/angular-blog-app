import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  credentials = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  handleLogin() {
    this.authService.login(this.credentials).subscribe(
      (data) => {
        localStorage.setItem('token', data['access_token']);
        this.router.navigate(['/']);
      },
      (err) => console.error(err),
      () => console.log('done login request')
    );
  }
}
