import { Actor, CollisionType, Color, Engine } from "excalibur";

export class Paddle extends Actor  {

    constructor(
        game: Engine,
        x: number = 150,
        y: number = 0) {

        if (y <= 0) {
            y = game.getDrawHeight() - 40;
        }

        const width: number = 200;
        const height: number = 20;
        

        super(x, y, width, height, Color.Chartreuse);

        this.collisionType = CollisionType.Fixed;
    }
}