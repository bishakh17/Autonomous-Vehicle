const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const traffic=[
    new Car("TRAFFIC",road.getLaneCenter(1),-100,2),
    new Car("TRAFFIC",road.getLaneCenter(0),-300,2),
    new Car("TRAFFIC",road.getLaneCenter(2),-300,2),
    new Car("TRAFFIC",road.getLaneCenter(0),-500,2),
    new Car("TRAFFIC",road.getLaneCenter(1),-500,2),
    new Car("TRAFFIC",road.getLaneCenter(1),-700,2),
    new Car("TRAFFIC",road.getLaneCenter(2),-700,2),
];
const N=1000;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            Brain.mutate(cars[i].brain,0.2);
        }
    }
}
cars[0].carType = "MAIN_AI";

animate();



function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car("DUMMY_AI",road.getLaneCenter(1),100));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
    bestCar.carType = "MAIN_AI";

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    //save the context onto the stack
    carCtx.save();

    //gives bird eye view by always drawing wrt bestcar
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
     
    //draw the snapshot of road and car after every frame
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue");

    //restore the context from the stack
    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);

    //similar to fps
    requestAnimationFrame(animate);
}