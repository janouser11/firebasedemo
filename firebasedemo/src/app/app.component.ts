import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';


interface Post {
  title: string;
  content: string;
}

interface PostId extends Post { 
  id: string; 
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  postsCol: AngularFirestoreCollection<Post>;
  title:string;
  content:string;
  posts: any;
  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;

  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
   
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  }
  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
  }

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    // this.posts = this.postsCol.valueChanges();

    this.posts = this.postsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }

  
}
