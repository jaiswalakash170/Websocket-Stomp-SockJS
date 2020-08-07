import { Component } from '@angular/core';
import { MessageService } from './message.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'websocket';
  public input : String = '';
  constructor(public service : MessageService) { }

  sendMessage(data){
    console.log(this.input);
    if (this.input) {
      this.service.sendMessage(this.input);
      this.input = '';
    }
  }
}
