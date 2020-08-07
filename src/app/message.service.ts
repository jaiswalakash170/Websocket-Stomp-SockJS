import { Injectable } from '@angular/core';
//import { SockJS } from 'sockjs-client';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
   }
   public stompClient;
   public msg = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:9999/websocket-app';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/greetings', (message) => {
        if (message.body) {
          console.log(message.body)
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message)
  {
    this.stompClient.send('/app/hello', {}, message);
  }
}
