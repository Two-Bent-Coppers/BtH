//@ts-check
'use strict';

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    create(){
        console.log("Game is starting.");
        virtualGamePad = this.createVirutalGamepad();
        console.log(String.fromCharCode(virtualGamePad.DPadDownBind0.keyCode));
        this.scene.start('PlayGame');
    }

    createVirutalGamepad(){
        var newVirtualGamePad = { 
            //DPad
            DPadLeftBind0   : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            DPadLeftBind1   : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            DPadRightBind0  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            DPadRightBind1  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            DPadUpBind0     : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            DPadUpBind1     : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            DPadDownBind0   : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            DPadDownBind1   : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        
            //Action Buttons
            Action1Bind0    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            Action1Bind1    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            Action2Bind0    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            Action2Bind1    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            Action3Bind0    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            Action3Bind1    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            Action4Bind0    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
            Action4Bind1    : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
        
            //Command Buttons
            StartBind0      : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK),
            StartBind1      : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
            SelectBind0     : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
            SelectBind1     : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS)    
        };
    
        return newVirtualGamePad;
    }
  
}

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        this.load.image('bg1', 'assets/backgrounds/dbg1.jpg');
        this.load.image('bg2', 'assets/backgrounds/dbg2.jpg');
        this.load.image('body', 'assets/sprites/fa_73_300.png')
        this.load.image('hair1', 'assets/sprites/hair1.png')
    }
    create(){
        console.log("This is a test scene");
        this.bg = this.add.image(1920/2, 1080/2, 'bg1').setOrigin(0.5, 0.5);
        //this.bg = this.add.image(1920/2, 1080/2, 'bg2').setOrigin(0.5, 0.5);
        this.bg.displayWidth = 1920;
        this.bg.displayHeight = 1080;

        

        //set container
        var avatar = this.add.container(960, 600,
            [
                this.add.sprite(0,0,'body'),
                this.add.sprite(0,-129,'hair1')
            ]
            ).setScale(3);

        //user input display
        this.text = this.add.text(50, 0, String.fromCharCode(virtualGamePad.DPadDownBind0.keyCode), {font: '32px Courier', fill: '#000000'});


        //add body part sprites
        //this.body = this.add.sprite(1920/2, 1080-(150*3), 'body');
        //this.hair = this.add.sprite(1920/2, 1080-(150*3)-129, 'hair1');
 
        //add body to container
        //avatar.add(body);
        //avatar.add(hair);

        //avatar = 

        //this.body = this.add.image(1920/2, 1080-(150*3), 'avatar');
        //this.body.scale = 3;

        //this.hair = this.add.image(1920/2, 1080-(150*3)-387, 'hair1');
        //this.hair.scale = 3;

        //this.body.setFlip(true, false);
        //this.hair.setFlip(true,false);
    }

}