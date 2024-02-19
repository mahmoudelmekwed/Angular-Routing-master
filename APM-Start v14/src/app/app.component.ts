import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  router: any;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDispalyed(): boolean {
    return this.messageservice.isDisplayed
  }

  constructor(private authService: AuthService,
    private route : Router,
    private messageservice : MessageService) { }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.route.navigateByUrl('/welcome')
  }

  showMessage(){
    this.route.navigate([{outlets: {popup : ['messages']} }]);
    this.messageservice.isDisplayed = true ;
  }

  hideMessage(){
    this.route.navigate([{ outlets: { popup: null } }]);
    this.messageservice.isDisplayed = false ;
  }
}
