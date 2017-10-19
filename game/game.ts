import { Actor, CollisionType, Color, Engine, Loader } from "excalibur";

import { Ball, Paddle } from "./actors";
import { Game } from "./engines";

var game = new Game();

var paddle = new Paddle(game);
game.addPaddle(paddle);

var ball = new Ball(game);
game.addBall(ball);



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

const brickWidth = game.getDrawHeight() / columns - padding - padding/columns;
const brickHeight = 30;
const bricks: any[] = [];

for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {

        const brick = new Actor(
            xOffset + j * (brickWidth + padding) + padding,
            yOffset + i * (brickHeight + padding) + padding,
            brickWidth,
            brickHeight,
            brickColor[j % brickColor.length]
        );

        brick.collisionType = CollisionType.Active;

        bricks.push(brick);
        game.add(brick);
    }
}

ball.on("precollision", function(event: ex.PreCollisionEvent) {
    
    if (bricks.indexOf(event.other) > -1) {
        event.other.kill();

        if (bricks.length == 0) {
            alert("You win!");
        }
    }

    const intersection = event.intersection.normalize();

    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        ball.vel.x *= -1;
    } else {
        ball.vel.y *= -1;
    }
});



// create an asset loader
// var loader = new Loader();
// var resources = {

//     /* include resources here */
//     //txPlayer: new ex.Texture("assets/tex/player.png")

// };

// queue resources for loading
// for (var r in resources) {
//     loader.addResource(resources[r]);
// }

// uncomment loader after adding resources
game.start(/* loader */).then(() => {

    // start your game!

});