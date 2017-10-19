import { Actor, CollisionType, Color, Engine } from "excalibur";

import { Ball, Paddle } from "../actors";

export class Game extends Engine {

    private paddle: Paddle;
    private ball: Ball;

    constructor() {

        const defaultWidth: number = 0;
        const defaultHeight: number = 0;

        super({ 
            width: defaultWidth,
            height: defaultHeight
        });

        this.setup();
    }

    public addPaddle(paddle: Paddle): void {
        if (!this.paddle) {
            this.paddle = paddle;
            this.add(paddle);
        }
    }

    public addBall(ball: Ball): void {
        if (!this.ball) {
            this.ball = ball;
            this.add(ball);
        }
    }

    private setup(): void {

        this.input.pointers.primary.on("move", function(event: PointerEvent) {
            if (this.paddle) {
                this.paddle.pos.x = event.x;
            }
        });
        
        this.input.pointers.primary.on("down", function(event: PointerEvent) {
        
            console.log(event.button);
        
            this.isPaused() 
                ? this.start()
                : this.stop();
        })
    }
}