class Controls{
    constructor(car){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;

        if(car.carType=="MAIN_KEYS"){
            this.#addKeyboardListeners();
        }
        else if(car.carType=="TRAFFIC"){
            this.forward = true;
        }
        else if(car.carType=="MAIN_AI" || car.carType=="DUMMY_AI"){
            // this.#addKeyboardListeners();
            const offsets=car.sensor.readings.map(
                s=>s==null?0:1-s.offset
            );
            const outputs=Brain.feedForward(offsets,car.brain);
            this.forward=outputs[0];
            this.left=outputs[1];
            this.right=outputs[2];
            this.reverse=outputs[3];
        }
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
        }
    }
}