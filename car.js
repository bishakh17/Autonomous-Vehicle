class Car{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.width=30;
        this.height=50;
        
        //gives the vehicle more natural motion
        this.speed=0;
        this.acceleration=0.4;
        this.maxSpeed=8.5;
        this.friction=0.06;
        this.angle=0; //rotating car instead of going left and right is more natural

        this.controls=new Controls();
    }

    update(){
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
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        //update x and y coordinates of car based on calculated speed and direction(angle)
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
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
    }
}