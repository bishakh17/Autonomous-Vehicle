class Car{
    constructor(canvas_width,width=30,height=50){
        this.road = new Road(canvas_width/2,canvas_width*0.9);
        this.canvas_width = canvas_width;
        this.x=canvas_width/2;
        this.y=0;
        this.width=width;
        this.height=height;
        
        //gives the vehicle more natural motion
        this.speed=0;
        this.acceleration=0.4;
        this.maxSpeed=8.5;
        this.friction=0.03;
        this.angle=0; //rotating car instead of going left and right is more natural

        this.controls = new Controls();
        this.sensor = new Sensor(this);
    }

    update(){
        this.sensor.update(this.road.borders);
        this.#move();
    }

    #move(){
        //update and limit max speed
        if(this.controls.forward){
            this.speed = Math.min(this.maxSpeed,this.speed+this.acceleration);
        }
        if(this.controls.reverse){
            this.speed = Math.max(-1*this.maxSpeed,this.speed-this.acceleration/1.7);
        }

        //simulate road friction to slow down car
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }

        //update car angle, if its going backwards turn in opposite direction
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.01*flip;
            }
            if(this.controls.right){
                this.angle-=0.01*flip;
            }
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        //update x and y coordinates of car based on calculated speed and direction(angle)
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        this.road.draw(ctx);

        ctx.save();
        //sets center of car
        ctx.translate(this.x,this.y); 
        //rotate car
        ctx.rotate(-this.angle);
        //draw rectangle around center
        ctx.beginPath();
        ctx.rect(                                  
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
        this.sensor.draw(ctx);
    }
}