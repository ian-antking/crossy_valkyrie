let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto,
    width: 640,
    height: 360,
    scene: gameScene,
};

let game = new Phaser.Game(config);

gameScene.init = function init(){
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
};

gameScene.preload = function preload(){
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
};

gameScene.create = function create(){

    const worldWidth = this.sys.game.config.width;
    const worldHeight = this.sys.game.config.height;
    const centerY = (worldHeight / 2);

    this.background = this.add.sprite(0,0, 'background');
    this.background.setOrigin(0);

    this.player = this.add.sprite(40, centerY, 'player');
    this.player.setScale(0.5);

    this.treasure = this.add.sprite(worldWidth - 80, centerY, 'treasure');
    this.treasure.setScale(0.6);
};

gameScene.update = function update(){

    if (this.input.activePointer.isDown){
        this.player.x += this.playerSpeed;
    };

    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())){
        this.gameOver();
    };
};

gameScene.gameOver = function gameOver() {
    this.scene.restart();
}