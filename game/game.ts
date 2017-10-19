/// <reference path="../node_modules/excalibur/dist/excalibur.d.ts" />

var game = new ex.Engine({
    width: 800,
    height: 600
});

var paddle = new ex.Actor(
    150,
    game.getDrawHeight() - 40,
    200,
    20);

paddle.color = ex.Color.Chartreuse;
paddle.collisionType = ex.CollisionType.Fixed;

game.add(paddle);

var ball = new ex.Actor(
    100, 
    300, 
    20, 
    20);

ball.color = ex.Color.Red;

ball.vel.setTo(
    100, 
    100);

ball.collisionType = ex.CollisionType.Passive;

ball.on("update", function() {
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

ball.draw = function (context: CanvasRenderingContext2D, delta: number) {

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

game.add(ball);

game.input.pointers.primary.on("move", function(event: PointerEvent) {
    paddle.pos.x = event.x;
});

game.input.pointers.primary.on("down", function(event: PointerEvent) {

    game.isPaused() 
        ? game.start()
        : game.stop();
})

const padding: number = 20;
const xOffset: number = 65;
const yOffset: number = 20;
const columns: number = 5;
const rows: number = 3;

const brickColor: ex.Color[] = [
    ex.Color.Violet,
    ex.Color.Orange,
    ex.Color.Yellow
];

const brickWidth = game.getDrawHeight() / columns - padding - padding/columns;
const brickHeight = 30;
const bricks = [];

for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {

        const brick = new ex.Actor(
            xOffset + j * (brickWidth + padding) + padding,
            yOffset + i * (brickHeight + padding) + padding,
            brickWidth,
            brickHeight,
            brickColor[j % brickColor.length]
        );

        brick.collisionType = ex.CollisionType.Active;

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

ball.on("exitviewport", function() {
    alert("Game over!");
});

// create an asset loader
var loader = new ex.Loader();
var resources = {

    /* include resources here */
    //txPlayer: new ex.Texture("assets/tex/player.png")

};

// queue resources for loading
for (var r in resources) {
    loader.addResource(resources[r]);
}

// uncomment loader after adding resources
game.start(/* loader */).then(() => {

    // start your game!

});