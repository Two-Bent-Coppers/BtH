//@ts-check
'use strict';

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }

    create(){
        gameLogic = this;
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

    handleMove(key_Input, key_Bindings, user_Container){
        //console.log("Called from " + forScene);
        //console.log("Keyup: " + key_Input.keyCode);
        //console.log("Virtual Pad Test: " + key_Bindings.DPadLeftBind0.keyCode);
        //console.log("Current Avatar Position: " + user_Container.x);


        switch (key_Input.keyCode) {
            case key_Bindings.DPadLeftBind0.keyCode:
            case key_Bindings.DPadLeftBind1.keyCode:
                console.log('monving left');
                user_Container.body.setVelocity(-SPEEDWALK,0);
                break;

            case key_Bindings.DPadRightBind0.keyCode:
            case key_Bindings.DPadRightBind1.keyCode:
                console.log('monving right');
                user_Container.body.setVelocity(SPEEDWALK,0);
                break;

            case key_Bindings.DPadUpBind0.keyCode:
            case key_Bindings.DPadUpBind1.keyCode:
                console.log('monving right');
                user_Container.body.setVelocity(SPEEDWALK,0);
                break;
        
            default:
                console.log("key input fail");
                break;
        }

    }
  
}

class userInterface extends Phaser.Scene{
    constructor(){
        super("UserInterface");
    }
    preload(){

    }
    create(){
        this.createUI(this);
    }

    update(){
        console.log("UI Update");
    }

    createUI(forScene){
        console.log('UI Loading');
        //user input display
        forScene.gamePad_Ui = forScene.add.container(80,80,
            [
                forScene.textDPadUp = forScene.add.text(0, -50, String.fromCharCode(virtualGamePad.DPadUpBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
                forScene.textDPadDown = forScene.add.text(0, 0, String.fromCharCode(virtualGamePad.DPadDownBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
                forScene.textDPadLeft = forScene.add.text(-50, 0, String.fromCharCode(virtualGamePad.DPadLeftBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
                forScene.textDPadRight = forScene.add.text(50, 0, String.fromCharCode(virtualGamePad.DPadRightBind0.keyCode), {font: '32px Courier', fill: '#0000ff'})
            ]).setScale(1.5);

            forScene.bodyHeat_UI = forScene.add.container(1500,50,
            [
                forScene.textCoreTemp = forScene.add.text(0, 0, 'Core Temp:', {font: '32px Courier', fill: '#0000ff'}),
                forScene.textSkinTemp = forScene.add.text(0, 50, 'Skin Temp:', {font: '32px Courier', fill: '#0000ff'}),
                forScene.textSurfaceTemp = forScene.add.text(0, 100, 'Surface Temp:', {font: '32px Courier', fill: '#0000ff'}),
                forScene.textAirTemp = forScene.add.text(0, 150, 'Air Temp:', {font: '32px Courier', fill: '#0000ff'})
            ]);
            forScene.textCoreTemp.setStroke('#fff', 8);
            forScene.textSkinTemp.setStroke('#fff', 8);
            forScene.textSurfaceTemp.setStroke('#fff', 8);
            forScene.textAirTemp.setStroke('#fff', 8);
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
        this.f = 0;
        console.log("This is a test scene");
        this.logicScene = this.scene.get('BootGame');
        this.uiCreate = this.scene.get('UserInterface');
        //gameLogic.handleMove(this, 0,0);
        

        
        this.bg = this.add.image(1920/2, 1080/2, 'bg1').setOrigin(0.5, 0.5);
        //this.bg = this.add.image(1920/2, 1080/2, 'bg2').setOrigin(0.5, 0.5);
        this.bg.displayWidth = 1920;
        this.bg.displayHeight = 1080;

        //set container
        avatar = this.add.container(960, 600,
            [
                this.add.sprite(0,0,'body'),
                this.add.sprite(0,-129,'hair1')
            ]
            ).setScale(3);
        this.physics.world.enable(avatar);
        this.physics.world.setFPS(60);

        this.uiCreate.createUI(this);

        this.input.keyboard.on('keydown', function(event){
            gameLogic.handleMove(event, virtualGamePad, avatar);
        }, this)
        this.input.keyboard.on('keyup', function(event){
            avatar.body.setVelocity(0,0);
        });

        /*
        this.input.keyboard.on('keydown', function(event){
            gameLogic.handleMove(event, virtualGamePad, avatar);
        }, this);
        */


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

    update(time, delta){
        //console.log(String.fromCharCode(virtualGamePad.DPadDownBind0.keyCode));
        /*
        this.f = delta + this.f;
        
        if (this.f > 1000){
            console.log("Delta: " + this.f);
            this.f = 0;
        } else{
            avatar.body.setVelocity(0,0);
        }
        */
        

    }

}