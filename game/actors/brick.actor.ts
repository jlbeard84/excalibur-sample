import { Actor, CollisionType, Color, Engine } from "excalibur";

export class Brick extends Actor  {

    constructor(
        game: Engine,
        color: Color,
        width: number,
        height: number,
        x: number,
        y: number) {

        super(x, y, width, height, color);

        this.collisionType = CollisionType.Active;

        this.setup();
    }

    private setup() {

        const brick = this;

        this.on("precollision", function(event: ex.PreCollisionEvent) {

            brick.kill();
        
            const intersection = event.intersection.normalize();
        
            if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
                event.other.vel.x *= -1;
            } else {
                event.other.vel.y *= -1;
            }
        });
    }
}