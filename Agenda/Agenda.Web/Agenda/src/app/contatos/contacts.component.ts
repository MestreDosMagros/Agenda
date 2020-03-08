import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { DatabaseService } from '../_services/database.service';
import { Contact } from '../_models/contact';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialog } from '../dialog/edit-contact-dialog';
import { NewContactDialog } from '../dialog/new-contact-dialog';

@Component({
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})

export class ContatosComponent implements OnInit {
    submited = false;
    contacts: Contact[];
    displayedColumns: string[] = ['name', 'phone', 'email', 'edit', 'delete'];
    dataSource = this.contacts;

    constructor(
        private autenticationService: AuthenticationService,
        private router: Router,
        private database: DatabaseService,
        private dialog: MatDialog
    ) {
        if (!this.autenticationService.user_autenticated()) {
            this.router.navigate(['/login'])
        }
    }

    ngOnInit() {
        this.getContacts();
    }

    getContacts() {
        this.database.GetAll().pipe(map(values => values.sort(this.sortByName))).subscribe(contacts => {
            this.contacts = contacts;
        });
    }

    sortByName(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    createNewContact() {
        this.dialog.open(NewContactDialog, {
            width: '600px'
        }).afterClosed().subscribe(x => {
            this.getContacts();
        })
    }

    deleteContact(id: number) {
        this.database.Delete(id);
        this.getContacts();
    }

    editContact(contact: any) {
        this.dialog.open(EditContactDialog, {
            width: '600px',
            data: {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone
            }
        }).afterClosed().subscribe(x => {
            this.getContacts();
        })
    }
}