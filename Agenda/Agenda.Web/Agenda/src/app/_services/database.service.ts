import { Injectable, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Contact } from '../_models/contact';
import { Observable, from } from 'rxjs';
import { error } from 'protractor';

@Injectable({ providedIn: 'root' })

export class DatabaseService {
    constructor(private dbService: NgxIndexedDBService) { }

    dbName = 'contacts';

    public GetAll(): Observable<any[]> {
        return from(this.dbService.getAll<any>(this.dbName));
    }

    public Add(contact: Contact) {
        this.dbService.add(this.dbName, { name: contact.Name, email: contact.Email, phone: contact.Phone }).then(
            () => { },
            error => {
                console.log(error);
            }
        )
    }

    public Delete(id: any) {
        this.dbService.delete(this.dbName, id);
    }

    public Update(contact: any) {
        this.dbService.update(this.dbName, { id: contact.id, name: contact.name, email: contact.email, phone: contact.phone }).then(
            () => { },
            error => {
                console.log(error);
            }
        )
    }
}