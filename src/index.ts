import { simulationParams } from "./configs/simulation-params";
import { InquirerManager } from "./menu/inquirer-manager";
import { MockPlayer } from "./socket/mocked-player";

class Main{

    playersMock = new Array<MockPlayer>();

    inquirerManager = new InquirerManager();

    main(){
        this.startTestApplication();
    }
    
    startTestApplication(){
        this.generatePlayers();
        this.startAppMenu();
    }


    generatePlayers(){   
        for(let i = 0; i < simulationParams.PLAYERS;i++){
            this.playersMock[i] = new MockPlayer(i);
        }
    }

    startAppMenu(){
        this.inquirerManager.startInquire(this.playersMock);
    }
}

export default new Main().main();