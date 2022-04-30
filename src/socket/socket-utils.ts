import { Socket } from "socket.io-client";
import { SocketEventClientEnumerator } from "./socket-mapping";

export class SocketObject {

    sendMessage(socket : Socket, event : SocketEventClientEnumerator, message : String) : void{
        socket.emit(SocketEventClientEnumerator[event].toString(),message);
    }
    sendMessageStringEvent(socket : Socket, event : string, message : String) : void{
        socket.emit(event,message);
    }
}