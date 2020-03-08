import { Component, OnInit } from "@angular/core";
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.css']
})

export class NavComponent implements OnInit {
    User: User

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        if (this.user_autenticated())
            this.User = this.authenticationService.currentUserValue;
    }

    private user_autenticated(): boolean {
        return this.authenticationService.user_autenticated();
    }

    private user(): User{
        return this.authenticationService.currentUserValue;
    }

    logout() {
        this.authenticationService.logout();
        window.location.reload(true);
    }
}


