import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../app/_services/authentication.service';
import { User } from '../_models/user';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    user = new User();
    error = '';
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        if (this.authenticationService.user_autenticated())
            this.router.navigate(['/']);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9a-zA-Z#$@]*')])]
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid)
            return;

        this.user.username = this.loginForm.controls.username.value;
        this.user.password = this.loginForm.controls.password.value;

        this.authenticationService.login(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/contacts']);
                },
                error => {
                    this.error = error;
                });
    }
}
