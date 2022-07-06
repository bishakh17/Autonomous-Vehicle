class Car{
    constructor(x,y=0,width=30,height=50){
        this.polygon = [];

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        
        //gives the vehicle more natural motion
        this.speed=0;
        this.acceleration=0.5;
        this.maxSpeed=10.5;
        this.friction=0.03;
        this.angle=0; //rotating car instead of going left and right is more natural

        this.controls = new Controls();
        this.sensor = new Sensor(this);
    }
    #createPolygon(){
        this.polygon = [];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        this.polygon.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        this.polygon.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        this.polygon.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        this.polygon.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
    } 

    update(roadBorders){
        this.#createPolygon();
        this.sensor.update(roadBorders);
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
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle="black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();
        this.sensor.draw(ctx);
    }
}