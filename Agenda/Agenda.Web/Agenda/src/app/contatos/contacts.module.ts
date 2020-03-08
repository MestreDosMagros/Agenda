import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContatosComponent } from './contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        ContactsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule
    ],
    declarations: [ContatosComponent]
})
export class RegisterModule { }