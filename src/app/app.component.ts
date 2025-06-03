import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
