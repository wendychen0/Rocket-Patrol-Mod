class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('space', './assets/space.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        this.load.audio('music', './assets/game-music.mp3');
      }

    create() {
      // place tile sprite
      //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
      this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0);

      let sfx = this.sound.add('music', {volume: 0.2});
      sfx.loop = true;
      sfx.play();

      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding -5, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      //this.scene.start("playScene");

      // add rocket (p1)
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

      // add spaceships (x4)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

      this.ship04 = new Spaceship(this, game.config.width + borderUISize*6 + 45, borderUISize*4 - 35, 'spaceship2', 0, 40).setOrigin(0,0);
      this.ship04.moveSpeed = 3.3;

      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // animation config
      this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
      });

      // initialize score
      this.p1Score = 0;

      input = this.input;
      input.on('pointerdown', this.clicked, this);
      input.on('pointerup', this.notClicked, this);

      this.reached = true;
      // display score
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let clockConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let highScConfig = {
        fontFamily: 'Courier',
        fontSize: '26px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 115
      }

      this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.p1Score, clockConfig);
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      this.fireText = this.add.text(borderUISize + borderPadding + 125, borderUISize + borderPadding*2, "FIRE", clockConfig);
      this.fireText.setVisible(false);
      this.highscoreText = this.add.text(borderUISize + borderPadding + 425, borderUISize + borderPadding*2, `HI:${highscore}`, highScConfig);

      // GAME OVER flag
      this.gameOver = false;
      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }, null, this);

    }
    update() {
      cursorx = input.x;
      cursory = input.y;
      // increase rocket speeds after 30 secs
      if (Math.trunc(this.clock.elapsed/1000) == 30 && this.reached) {
        this.ship01.moveSpeed += 1.5;
        this.ship02.moveSpeed += 1.5;
        this.ship03.moveSpeed += 1.5;
        this.ship04.moveSpeed += 1.5;
        this.reached = false;
      }
      // check key input for restart
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.start("menuScene");
      }
      this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());

      //this.starfield.tilePositionX -= 4;
      this.space.tilePositionX -= 4;

      if (!this.gameOver) {               
        this.p1Rocket.update();         // update rocket sprite
        this.ship01.update();           // update spaceships (x4)
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
      } 

      // FIRE UI
      if (this.p1Rocket.isFiring == true) {
        this.fireText.setVisible(true);
      }
      if (this.p1Rocket.isFiring == false) {
        this.fireText.setVisible(false);
      }

      // check collisions
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
        //console.log('kaboom ship 03');
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
        //console.log('kaboom ship 02');
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
        //console.log('kaboom ship 01');
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
      }
      if (this.checkCollision(this.p1Rocket, this.ship04)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship04);
      }
  
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
            return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        console.log('score',this.p1Score);
        this.scoreLeft.text = this.p1Score;  
        let num = Math.floor(Math.random() * 4);
        //this.sound.play('sfx_explosion');
        console.log(num);
        if (num == 0) {
          this.sound.play('explosion1');
        }
        if (num == 1) {
          this.sound.play('explosion2');
        }
        if (num == 2) {
          this.sound.play('explosion3');
        }
        if (num == 3) {
          this.sound.play('explosion4');
        }
        // add 1 second to timer when a ship is hit
        this.clock.delay += ship.points * 100;
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());   
    }
    clicked(){
      mousedown = true;
    }
    notClicked(){
      mousedown = false;
    }
}