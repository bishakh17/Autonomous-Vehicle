class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        if(this.controls.reverse){ 
            this.y+=2;
        }
        if(this.controls.forward){
            this.y-=2;
        }
        if(this.controls.right){
            this.x+=2;
        }
        if(this.controls.left){
            this.x-=2;
        }
    }

    draw(ctx){
        ctx.save();
        
        //sets center of car
        ctx.translate(this.x,this.y); 
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