import { Actor, CollisionType, Color, Engine } from "excalibur";

export class Ball extends Actor  {

    constructor(
        game: Engine,
        x: number = 100,
        y: number = 300) {

        const height: number = 20;
        const width: number = 20;

        super(x, y, width, height, Color.Red);

        this.setupBall(game);
    }

    public drawBall(context: CanvasRenderingContext2D, delta: number) {
        
        context.fillStyle = this.color.toString();
        
        context.beginPath();
    
        context.arc(
            this.pos.x,
            this.pos.y,
            10, 
            0, 
            Math.PI * 2);
    
        context.closePath();
    
        context.fill();
    }

    private setupBall(game: Engine): void {
        
        this.collisionType = CollisionType.Passive;
        
        //do this somewhere else?
        this.vel.setTo(100, 100);

        this.draw = this.drawBall;

        this.on("update", function() {
            if (this.pos.x < (this.getWidth() / 2)) {
                this.vel.x *= -1;
            }
        
            if (this.pos.x + (this.getWidth() / 2) > game.getDrawWidth()) {
                this.vel.x *= -1;
            }
        
            if (this.pos.y < (this.getHeight() / 2)) {
                this.vel.y *= -1;
            }
        });

        this.on("exitviewport", function() {
            //alert("Game over!");
        });
    }
}