import inquirer, { InputQuestion } from "inquirer"
import { simulationParams } from "../configs/simulation-params";
import { MockPlayer } from "../socket/mocked-player";
import { SocketEventClientEnumerator, SocketEventServerEnumerator } from "../socket/socket-mapping";

export class InquirerManager {

    users ?: Array<MockPlayer>;

    startInquire(users : Array<MockPlayer>){
        this.users = users;
        this.retryRequire();
    }

    retryRequire(){
        inquirer.prompt(this.eventQuestion).then(
            this.handleInquireQuestions, 
            (error) => 
            {   
                console.error(error);
            }     
        )
    }

    handleInquireQuestions = (data : EnquireServerCommandResponse) => {
        this.processInquireDialog(data.command,data.commandMessage,data.playerRange);
        this.retryRequire();
    }


    processInquireDialog(command : string, message : string, range : string){
        let players = this.getRangePlayers(range);
        players.forEach((player)=>{
            player.sendMessageStringEvent(player.socket,command,message);
        })

    }

    getRangePlayers(range : string) : Array<MockPlayer>{
        let players = new Array();
        try{
            if(range.includes("-")){
                let intervals = range.split("-");
                let intervalStart = Number.parseInt(intervals[0]);
                let intervalEnd = Number.parseInt(intervals[1]);

                players = this.users!.slice(intervalStart,intervalEnd);
            }
            if(typeof(Number.parseInt(range)) ==  "number"){
                players.push(this.users![Number.parseInt(range)]);
            }
            if(range == "ALL"){
                players = JSON.parse(JSON.stringify(this.users));
            }
            
        }
        catch(err){
            console.error(err);
        }
        finally{
            return players;
        }
    }

    socketSentEvents = Object.values(SocketEventClientEnumerator).slice(0,Object.keys(SocketEventClientEnumerator).length / 2);

    eventQuestion = 
    [        
        {
            type : "rawlist",
            name : "command",
            message : "Command to send to server",
            choices: this.socketSentEvents,
        },
        {
            type : "input",
            name : "commandMessage",
            message : "Message to server (if required)",
            choices: this.socketSentEvents,
        },
        {
            type: "input",
            name: "playerRange",
            message: `Chose the range of players (1-any (any <=${simulationParams.PLAYERS}),27(single index),"ALL"):`
        }
    ]
}

export class EnquireServerCommandResponse {
    command !: string;
    commandMessage !: string;
    playerRange !: string;
}