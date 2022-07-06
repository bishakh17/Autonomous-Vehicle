class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=10;
        this.rayLength=150;
        this.raySpread=Math.PI/2;

        this.rays=[];//list containing the x and y coordinates of all the rays
        this.readings=[]; //list containing the readings(coordinates of intersection) for each of the cast rays 
    }

    update(roadBorders){
        this.#castRays(); 
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){//loop over each ray and find the corresponding reading
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            );
        }
    }

    //
    #getReading(ray,roadBorders){
        let touches=[];//list of all intersection points of obstacles and the given ray cast by the sensor

        for(let i=0;i<roadBorders.length;i++){//loop over all the ray boders to get a list of all the intersection points with the given ray
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length==0){
            return null;
        }else{ //return the minimum of all those intersection points
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    //makes a list of all rays with start and end points
    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }

    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            //ray before intersection => yellow
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
            //ray before intersection => black
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }        
}