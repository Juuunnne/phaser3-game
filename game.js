var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var row = 40;
var col = 45;
var gameOver = false;
var tileWidth = 36;
var controls;
let character
let cursors
var walkable = false;
var pos_x, pos_y;
var playerPos = [pos_x, pos_y];

var game = new Phaser.Game(config);

function preload() {
    this.load.image("zoro", "assets/zoro.png");
    this.load.image("tiles", "assets/tiles.jpg");
    this.load.image("grass", "assets/grass.png");
    this.load.tilemapTiledJSON('map', "assets/map.json");
    
}

function create() {
    var cursors = this.input.keyboard.createCursorKeys();
    
    this.cameras.main.setZoom(1);

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.7,
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 16 });
    const tileset = map.addTilesetImage("grass", "grass");
    const layer = map.createLayer("toplayer", tileset, 0, 0);
    

    character = this.physics.add.image(100, 500, 'zoro')
    character.scale = 0.2;
    character.body.collideWorldBounds = true;


    cursors = this.input.keyboard.createCursorKeys()



}

function update(time, delta) {
    controls.update(delta);


}

function cartesianToIsometric(cartPt) {
    var tempPt = new Phaser.Point();
    tempPt.x = cartPt.x - cartPt.y;
    tempPt.y = (cartPt.x + cartPt.y) / 2;
    return (tempPt);
}
function isometricToCartesian(isoPt) {
    var tempPt = new Phaser.Point();
    tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
    tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
    return (tempPt);
}
function getTileCoordinates(cartPt, tileHeight) {
    var tempPt = new Phaser.Point();
    tempPt.x = Math.floor(cartPt.x / tileHeight);
    tempPt.y = Math.floor(cartPt.y / tileHeight);
    return (tempPt);
}
function getCartesianFromTileCoordinates(tilePt, tileHeight) {
    var tempPt = new Phaser.Point();
    tempPt.x = tilePt.x * tileHeight;
    tempPt.y = tilePt.y * tileHeight;
    return (tempPt);
}



var levelmap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

