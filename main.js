const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const traffic=[
    new Car("TRAFFIC",road.getLaneCenter(1),-100,4)
];
const car = new Car("MAIN_AI",road.getLaneCenter(1));

animate();

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    //save the context onto the stack
    carCtx.save();

    //gives bird eye view by fixing a stationary point
    carCtx.translate(0,-car.y+carCanvas.height*0.7);
     
    //draw the snapshot of road and car after every frame
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue");

    //restore the context from the stack
    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,car.brain);

    //similar to fps
    requestAnimationFrame(animate);
}