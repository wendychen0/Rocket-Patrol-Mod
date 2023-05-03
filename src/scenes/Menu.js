class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      this.load.audio('explosion1', './assets/explosion1.wav');
      this.load.audio('explosion2', './assets/explosion2.wav');
      this.load.audio('explosion3', './assets/explosion3.wav');
      this.load.audio('explosion4', './assets/explosion4.wav');
    }
    create() {
      // menu text configuration
      let menuConfig = {
        fontFamily: 'Sigmar',
        fontSize: '35px',
        backgroundColor: '#33658A',//'#F3B141',
        color: '#E6D48E',//#843605',
        align: 'right',
        borderRadius: '25px',
        padding: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5
        },
        fixedWidth: 0
      }
      //this.add.text(20, 20, "Rocket Patrol Menu");
      //this.scene.start("playScene");

      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 90, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
      
      menuConfig.backgroundColor = '#600E93'; //dark purple
      menuConfig.color = '#C3B1E1'; //pastel purple
      menuConfig.fontSize = 28;
      this.add.text(game.config.width/2, game.config.height/2 - 20, 'Use the mouse to move & click/(F) to fire', menuConfig).setOrigin(0.5); //←→
      menuConfig.backgroundColor = '#22447A';//'#00FF00';
      menuConfig.color = '#B5DDF0';//'#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding - 20, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

      menuConfig.backgroundColor = '#33658A';
      menuConfig.color = '#DB995A';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2 + 50, 'High Score: ' + highscore, menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
  }