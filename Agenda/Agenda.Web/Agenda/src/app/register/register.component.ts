import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../app/_services/authentication.service';
import { User } from '../_models/user';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    user = new User();
    error = '';
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        if (this.authenticationService.user_autenticated())
            this.router.navigate(['/contacts']);
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9a-zA-Z#$@]*')])]
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid)
            return;

        this.user.email = this.registerForm.controls.email.value;
        this.user.username = this.registerForm.controls.username.value;
        this.user.password = this.registerForm.controls.password.value;

        this.authenticationService.register(this.user)
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