import { Actor, CollisionType, Color, Engine, Loader } from "excalibur";
import TiledResource from '@excaliburjs/excalibur-tiled'

import { Ball, Paddle } from "./actors";
import { Game } from "./engines";

var game = new Game();
game.loadScene();

var mappath = "/assets/tilesets/testmap.json";
var map = new TiledResource(mappath);
map.imagePathAccessor = function (path, tileset) {
    return this.path;
 }
//map.processData(map.data);
var loader = new Loader([map]);




// var resources = {
//     /* include resources here */
//     //txPlayer: new ex.Texture("assets/tex/player.png")
// };

// queue resources for loading
// for (var r in resources) {
//     loader.addResource(resources[r]);
// }

// uncomment loader after adding resources
game.start(loader).then(() => {

    console.log("Game loaded");

    console.log(map);
    
    // Process the data in the map as you like
    // map.data.tilesets.forEach(function(ts) {
    //    console.log(ts.image);
    // });
    
    // get a Excalibur `TileMap` instance
    var tm = map.getTileMap();
    
    // draw the tile map
    game.add(tm);
});