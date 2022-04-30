import { io } from "socket.io-client";
import { SocketEventClientEnumerator, SocketEventServerEnumerator } from "./socket-mapping";
import { SocketObject } from "./socket-utils";
import * as parser from "./parser/socket-parser"
import { SocketReceiverHandler } from "./socket-receiver-handler";
export class MockPlayer extends SocketObject{
    socket = io("http://localhost:3000", {
        parser: parser
    });
    mockPrefix = "PLAYER_";
    playerName = "";
    alive = true;
    constructor(index : number){
        super();
        this.playerName = this.mockPrefix + index;
        this.socket.on(`${SocketEventServerEnumerator.CONNECTION_READY}`, () => {
            this.authenticate();
        });
        this.socket.onAny((name,...args)=>{
            //event.push(this.playerName); 
            SocketReceiverHandler.nameLog = this.playerName;
            SocketReceiverHandler.handleSocketEvent(name,args);
        })
        
    }

    authenticate(){
        console.log("---- Autenticando " + this.playerName + " ----");
        this.sendMessage(this.socket,SocketEventClientEnumerator.AUTENTICATE,this.playerName);
    }
}