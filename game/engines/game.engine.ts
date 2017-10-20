import { Actor, CollisionType, Color, Engine } from "excalibur";

import { Ball, Brick, Paddle } from "../actors";

export class Game extends Engine {

    private bricks: Brick[];
    private paddle: Paddle;
    private ball: Ball;

    constructor() {

        const defaultWidth: number = 800;
        const defaultHeight: number = 600;

        super({ 
            width: defaultWidth,
            height: defaultHeight
        });

        this.setup(this);
    }

    public loadScene() {
        this.paddle = new Paddle(this);
        this.add(this.paddle);
        
        this.ball = new Ball(this);
        this.add(this.ball);

        this.bricks = [];

        const padding: number = 20;
        const xOffset: number = 65;
        const yOffset: number = 20;
        const columns: number = 5;
        const rows: number = 3;
        
        const brickColor: Color[] = [
            Color.Violet,
            Color.Orange,
            Color.Yellow
        ];
        
        const brickWidth = this.getDrawHeight() / columns - padding - padding/columns;
        const brickHeight = 30;
        
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
        
                const brick = new Brick(
                    this,
                    brickColor[j % brickColor.length],
                    brickWidth,
                    brickHeight,
                    xOffset + j * (brickWidth + padding) + padding,
                    yOffset + i * (brickHeight + padding) + padding
                );

                this.bricks.push(brick);
                this.add(brick);
            }
        }   
    }

    private setup(game: Game): void {

        this.input.pointers.primary.on("move", function(event: PointerEvent) {
            if (game.paddle) {
                game.paddle.pos.x = event.x;
            }
        });
        
        this.input.pointers.primary.on("down", function(event: PointerEvent) {
        
            console.log(event.button);
        
            game.isPaused() 
                ? game.start()
                : game.stop();
        })
    }
}