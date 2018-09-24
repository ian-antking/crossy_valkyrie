let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto,
    width: 640,
    height: 360,
    scene: gameScene,
};

let game = new Phaser.Game(config);

gameScene.preload = function preload(){
    this.load.image('background', 'assets/background.png');
};

gameScene.create = function create(){
    this.background = this.add.sprite(0,0, 'background');
    this.background.setOrigin(0);
};

gameScene.update = function update(){

};