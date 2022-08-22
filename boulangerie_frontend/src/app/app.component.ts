import { Component } from '@angular/core';
import {Store} from "../store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boulangerie-frontend';


  constructor(private store: Store) {
  }

  ngOnInit(){
    if(localStorage.getItem('connectedUser') && !this.store.value.connectedUser){
      const token = JSON.parse(localStorage.getItem('connectedUser'));
      this.store.set('connectedUser', token);
    }
  }
}
