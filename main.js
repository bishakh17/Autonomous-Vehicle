const canvas=document.getElementById("myCanvas");
canvas.width=200;


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const traffic=[
    new Car("TRAFFIC",road.getLaneCenter(1),-100,4)
];
const car = new Car("MAIN_AI",road.getLaneCenter(1));

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    canvas.height=window.innerHeight;
    //save the context onto the stack
    ctx.save();

    //gives bird eye view by fixing a stationary point
    ctx.translate(0,-car.y+canvas.height*0.7);
     
    //draw the snapshot of road and car after every frame
    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue");

    //restore the context from the stack
    ctx.restore();

    //similar to fps
    requestAnimationFrame(animate);
}