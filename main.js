const canvas=document.getElementById("myCanvas");
canvas.width=200;


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1));

animate();

function animate(){
    car.update(road.borders);

    canvas.height=window.innerHeight;
    //save the context onto the stack
    ctx.save();

    //gives bird eye view by fixing a stationary point
    ctx.translate(0,-car.y+canvas.height*0.7);
     
    //draw the snapshot of road and car after every frame
    road.draw(ctx);
    car.draw(ctx);

    //restore the context from the stack
    ctx.restore();

    //similar to fps
    requestAnimationFrame(animate);
}