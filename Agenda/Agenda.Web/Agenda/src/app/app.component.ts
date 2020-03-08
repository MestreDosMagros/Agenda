import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './_services/database.service';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agenda';
  constructor(private dbService: DatabaseService,
    private autenticationService: AuthenticationService,
    private router: Router) {

    if (window.location.pathname != '/register' && !this.autenticationService.user_autenticated()) {
      this.router.navigate(['/login'])
    } else if (this.autenticationService.user_autenticated()) {
      this.router.navigate(['/contacts']);
    }
  }
}
