import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  constructor(private http:HttpClient) { }

  sender:any="";
  receiver="";
  message='';
  search="";
  showMsg:boolean=false;
  UserMsg:any={sender:"zakaria",receiver:"yassine",message:[]};
  messages:any=[

];

  ngOnInit(): void {

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    this.sender= params.get("user")




    Pusher.logToConsole = true;

    var pusher = new Pusher('2b33e5b65cdbdcfca5b9', {
      cluster: 'eu'
    });


    const channel = pusher.subscribe('chat');
    channel.bind('message', (data:any) => {
     this.messages.push({sender:data.sender,receiver:data.receiver,message:[data.message]});
     this.UserMsg.message.push(data.message)
    });



  }



  submit(){

    this.http.post("http://localhost:8000/api/messages",{

      sender: this.sender,
      receiver:this.receiver,
      message: this.message

    }).subscribe(()=>this.message='');


  }


 handleChat(param:object){


  this.UserMsg=param;
  this.showMsg=true;

 }


 handlesearch(){



  this.receiver=this.search
  this.showMsg=true
  setTimeout(() => {
    this.search=""
  }, 500);


 }




}
