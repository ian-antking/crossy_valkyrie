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

    this.enemies = this.add.group({
        key: 'dragon',
        repeat: 5,
        setXY: {
            x: 110,
            y: 100,
            stepX: 80,
            stepY: 20,
        }
    });

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        enemy.speed = Math.random() * 2 + 1;
    }, this);

};

gameScene.update = function update(){

    if (this.input.activePointer.isDown){
        this.player.x += this.playerSpeed;
    };

    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())){
        this.gameOver();
    };

    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;


    enemies.forEach(enemy => {
        enemy.y += enemy.speed;

        if (enemy.y >= this.enemyMaxY && enemy.speed > 0){
            enemy.speed *= -1;
        } else if (enemy.y <= this.enemyMinY && enemy.speed < 0){
            enemy.speed *= -1;
        }

    });

    // for (let enemy = 0; enemy < numEnemies; enemy +=1){
    //     enemies[enemy].y += enemies[enemy].speed;

    //     if (enemies[enemy].y >= this.enemyMaxY && enemies[enemy].speed > 0){
    //         enemies[enemy].speed *= -1;
    //     } else if (enemies[enemy].y <= this.enemyMinY && enemies[enemy].speed > 0){
    //         enemies[enemy].speed *= -1;
    //     }

    //     if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemies[enemy].getBounds())){
    //         this.gameOver();
    //     };
    

    // }

};

gameScene.gameOver = function gameOver() {
    this.scene.restart();
}