import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatosComponent } from './contacts.component';

const routes: Routes = [
    {
        path: '',
        component: ContatosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }