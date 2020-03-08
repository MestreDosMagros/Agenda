import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from '../_services/database.service';
import { Contact } from '../_models/contact';

@Component({
    selector: 'new-contact-dialog',
    templateUrl: './new-contact-dialog.html',
})

export class NewContactDialog implements OnInit {
    newContactForm: FormGroup;
    submited = false;

    constructor(
        public dialogRef: MatDialogRef<NewContactDialog>,
        private database: DatabaseService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.newContactForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }

    onSubmit() {
        this.submited = true;

        if (this.newContactForm.invalid)
            return;

        let contact = new Contact();
        contact.Name = this.newContactForm.controls.name.value;
        contact.Email = this.newContactForm.controls.email.value;
        contact.Phone = this.newContactForm.controls.phone.value;

        this.database.Add(contact);

        this.dialogRef.close();
    }
}