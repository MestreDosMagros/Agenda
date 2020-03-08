import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactDialogData } from '../interfaces/contact-dialog-data';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from '../_services/database.service';

@Component({
    selector: 'edit-contact-dialog',
    templateUrl: './edit-contact-dialog.html',
})

export class EditContactDialog implements OnInit {
    editContactForm: FormGroup;
    submited = false;

    constructor(
        public dialogRef: MatDialogRef<EditContactDialog>,
        @Inject(MAT_DIALOG_DATA)
        public data: ContactDialogData,
        private database: DatabaseService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editContactForm = this.formBuilder.group({
            name: [this.data.name, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            phone: [this.data.phone, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            email: [this.data.email, [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.submited = true;

        if (this.editContactForm.invalid)
            return;

        this.database.Update({
            id: this.data.id,
            name: this.editContactForm.controls.name.value,
            email: this.editContactForm.controls.email.value,
            phone: this.editContactForm.controls.phone.value
        });

        this.dialogRef.close();
    }
}