const canvas=document.getElementById("myCanvas");
canvas.width=200;
canvas.height=window.innerHeight;

const ctx = canvas.getContext("2d");
const car=new Car(100,100);

animate();

function animate(){
    //draws fresh background in every loop so no car trails are left
    canvas.height=window.innerHeight;

    car.update();
    car.draw(ctx);

    //similar to fps
    requestAnimationFrame(animate);
}