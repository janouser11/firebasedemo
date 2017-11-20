import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';


interface Contact {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactId extends Contact { 
  id: string; 
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  contactsCol: AngularFirestoreCollection<Contact>;
  name:string;
  phone:string;
  email:string;
  message: string;
  contacts: any;
  contactDoc: AngularFirestoreDocument<Contact>;
  contact: Observable<Contact>;

  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.contactsCol = this.afs.collection('contacts');

    this.contacts = this.contactsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }

  addContact() {
    this.afs.collection('contacts').add({'name': this.name,  'phone': this.phone ,'email': this.email , 'message': this.message});
  }
  deleteContact(contactId) {
    this.afs.doc('contacts/'+contactId).delete();
  }

  getContact(contactId) {
    this.contactDoc = this.afs.doc('contacts/'+contactId);
    this.contact = this.contactDoc.valueChanges();
  }

 

  
}
