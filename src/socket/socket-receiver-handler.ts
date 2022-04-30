import { SocketEventServerEnumerator } from "./socket-mapping";

export class SocketReceiverHandler {

    static eventsLogHided = [
        SocketEventServerEnumerator.ALL_CHALLENGER_GRID,
        SocketEventServerEnumerator.CHALLENGER_GRID_UPDATE,
        SocketEventServerEnumerator.IN_MATCH_PLAYERS
    ]

    static nameLog = "";

    static handleSocketEvent(name : string,...args: any[]){
        if(!this.eventsLogHided.find((event)=> event == args[0])){
            let log = "";
            log += `| ${name} |`
            args.forEach(arg => log += `| ${arg} |`);
            log += `| ${this.nameLog} |`;
            console.log(log);
        }
    }
}