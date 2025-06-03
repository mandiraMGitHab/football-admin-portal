import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    const stEmail = 'test@gmail.com';
    const stPassword = '123';

    if (this.email === stEmail && this.password === stPassword) {
      localStorage.setItem('token', 'text-token');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password');
    }
  }
}
