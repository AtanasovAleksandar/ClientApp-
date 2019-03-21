import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userTitle: any;
 
  constructor( private _authService: AuthService,){}

  ngAfterViewInit(): void {
    this.userTitle = this._authService.role 
  }


  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  isLoggedIn() {
    // console.log(this._authService.isLoggedIn())
    return this._authService.isLoggedIn();
  }
}
