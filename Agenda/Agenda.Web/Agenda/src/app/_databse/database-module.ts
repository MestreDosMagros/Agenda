import { NgModule } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { environment } from 'src/environments/environment';


export function migrationFactory() {
    return {
        1: (db, transaction) => {
            const store = transaction.objectStore('contacts');
        },
    };
}

const dbConfig: DBConfig = {
    name: environment.dbName,
    version: 1,
    objectStoresMeta: [{
        store: 'contacts',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'name', keypath: 'name', options: { unique: false } },
            { name: 'phone', keypath: 'phone', options: { unique: true } },
            { name: 'email', keypath: 'email', options: { unique: false } }
        ]
    }],

    migrationFactory
};

@NgModule({
    imports: [NgxIndexedDBModule.forRoot(dbConfig)],
})

export class DatabaseModule { }
