//@ts-check
'use strict';

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }

    create(){
        globalBrain.variables.gameLogic = this;
        console.log("Game is starting.");
        globalBrain.variables.virtualGamePad = createVirutalGamepad(this);
        console.log(String.fromCharCode(globalBrain.variables.virtualGamePad.DPadDownBind0.keyCode));
        this.scene.launch('Airplane');
        this.scene.launch('UserInterface');

        //this.scene.bringToTop('UserInterface');
    }
  
}

class userInterface extends Phaser.Scene{
    constructor(){
        super("UserInterface");
    }
    preload(){

    }
    create(){
        this.scene.bringToTop('UserInterface');
        createUI(this);
    }
}

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        this.load.image('desertBg1', 'assets/backgrounds/dbg1.jpg');
        loadUserAvatar(this);
    }
    create(){
        console.log(this.scene.key);
        
        this.bg = this.add.image(1920/2, 1080/2, 'desertBg1').setOrigin(0.5, 0.5);
        //this.bg = this.add.image(1920/2, 1080/2, 'bg2').setOrigin(0.5, 0.5);
        this.bg.displayWidth = 1920;
        this.bg.displayHeight = 1080;
        console.log(this.textures.getPixel(200, 200, 'desertBg1'));
        console.log(this.textures.get('desertBg1').getSourceImage(0).height);
        console.log(this.physics.world.bounds);

        //To Left Scene
        this.arrows = this.add.sprite(50, 1080-200, 'arrows', 'up.png');
        this.arrows.setScale(3,3);
        this.mouse1ui = this.add.image(50, 1080-100, 'mouse1click');
        this.mouse1ui.setScale(2,2);
        this.leftSceneText = this.add.text(100, 1080-100, 'Desert 2', {font: '48px Courier'});
        this.leftSceneText.setFill('#0000ff');
        this.leftSceneText.setStroke('#fff', 4);

        //To Right Scene
        this.arrows2 = this.add.sprite(1920-50, 1080-200, 'arrows', 'up.png');
        this.arrows2.setScale(3,3);
        this.mouse1ui2 = this.add.image(1920-50, 1080-100, 'mouse1click');
        this.mouse1ui2.setScale(2,2);
        this.rightSceneText = this.add.text(1920-100, 1080-100, 'To Airport', {font: '48px Courier', align: 'right'});
        this.rightSceneText.setFill('#0000ff');
        this.rightSceneText.setStroke('#fff', 4);
        this.rightSceneText.x = (1920-100) - this.rightSceneText.width;

        //set container
        globalBrain.variables.avatar = createUserAvatar(this);
        this.physics.world.enable(globalBrain.variables.avatar);
        this.physics.world.setFPS(60);
        
        playerMovement(this);
    }

    update(){
        playerClickMoveCheck();
        changeSceneByEdge(this, "AirportBaggage", 'right', 100, 1920);
        changeSceneByEdge(this, "Desert2", 'left', 100, 1920);
    }

}

class airplane extends Phaser.Scene{
    constructor(){
        super("Airplane");
    }
    preload(){
        this.load.image('airplane', 'assets/backgrounds/airplaneInside1.png');
        this.load.multiatlas('arrows', 'assets/sprites/arrows/arrows.json', 'assets/sprites/arrows');
        this.load.image('mouse1click', 'assets/sprites/mouse1click.png');
        loadUserAvatar(this);
    }
    create(){
        console.log(this.scene.key);
        this.bg = this.add.image(1920/2, 1080/2, 'airplane').setOrigin(0.5, 0.5);

        //To Left Scene
        this.arrows = this.add.sprite(50, 1080-200, 'arrows', 'up.png');
        this.arrows.setScale(3,3);
        this.mouse1ui = this.add.image(50, 1080-100, 'mouse1click');
        this.mouse1ui.setScale(2,2);
        this.leftSceneText = this.add.text(100, 1080-100, 'To Baggage Claim', {font: '48px Courier'});
        this.leftSceneText.setFill('#0000ff');
        this.leftSceneText.setStroke('#000', 4);

        //set container
        globalBrain.variables.avatar = createUserAvatar(this);
        this.physics.world.enable(globalBrain.variables.avatar);
        this.physics.world.setFPS(60);  
        playerMovement(this);


        
    }
    update(){
        playerClickMoveCheck();
        changeSceneByEdge(this, "AirportBaggage", 'left', 100,1920);
    }
}

class airportTerminal extends Phaser.Scene{
    constructor(){
        super("AirportTerminal");
    }
    preload(){

    }
    create(){
    
    }
}

class airportBaggage extends Phaser.Scene{
    constructor(){
        super("AirportBaggage");
    }
    preload(){
        this.load.image('baggageClaim', 'assets/backgrounds/baggageClaim1.png');
        loadUserAvatar(this);
    }
    create(){
        console.log(this.scene.key);
        this.bg = this.add.image(3840/2,1080/2,'baggageClaim').setOrigin(0.5, 0.5);
        this.physics.world.setBounds(0,0,3840,1080);
        
        //set container
        globalBrain.variables.avatar = createUserAvatar(this);
        this.physics.world.enable(globalBrain.variables.avatar);
        globalBrain.variables.avatar.body.reset(3840/2, 1080/2);
        this.physics.world.setFPS(60);
        this.cameras.main.setBounds(0, 0, this.bg.displayWidth, this.bg.displayHeight);
        this.cameras.main.startFollow(globalBrain.variables.avatar, true, 0.05, 0.05);

        //Scrolling guides
        this.arrows3 = this.add.sprite(100,1080-100,'arrows','left.png')
        this.arrows3.setScale(3,3);
        this.arrows3.setScrollFactor(0,0);
        this.arrows4 = this.add.sprite(1920-100,1080-100,'arrows','right.png')
        this.arrows4.setScale(3,3);
        this.arrows4.setScrollFactor(0,0);
        this.mouse1ui3 = this.add.image(1920/2, 1080-100, 'mouse1click');
        this.mouse1ui3.setScale(2,2);
        this.mouse1ui3.setScrollFactor(0,0);

        //To Left Scene
        this.arrows = this.add.sprite(50, 1080-200, 'arrows', 'up.png');
        this.arrows.setScale(3,3);
        this.mouse1ui = this.add.image(50, 1080-100, 'mouse1click');
        this.mouse1ui.setScale(2,2);
        this.leftSceneText = this.add.text(100, 1080-100, 'Desert 1', {font: '48px Courier'});
        this.leftSceneText.setFill('#0000ff');
        this.leftSceneText.setStroke('#fff', 4);

        //To Right Scene
        this.arrows2 = this.add.sprite(3840-50, 1080-200, 'arrows', 'up.png');
        this.arrows2.setScale(3,3);
        this.mouse1ui2 = this.add.image(3840-50, 1080-100, 'mouse1click');
        this.mouse1ui2.setScale(2,2);
        this.rightSceneText = this.add.text(3840-100, 1080-100, 'To Airplane', {font: '48px Courier', align: 'right'});
        this.rightSceneText.setFill('#0000ff');
        this.rightSceneText.setStroke('#fff', 4);
        this.rightSceneText.x = (3840-100) - this.rightSceneText.width;
        
    
        playerMovement(this);
        
    }

    update(){
        playerClickMoveCheck();
        changeSceneByEdge(this, "Airplane", 'right', 100, 3840);
        changeSceneByEdge(this, "PlayGame", 'left', 100, 3840);
    }
}

class airportPickup extends Phaser.Scene{
    constructor(){
        super("AirportPickup");
    }
    preload(){

    }
    create(){
    
    }
}

class airportPublicTrans extends Phaser.Scene{
    constructor(){
        super("AirportPublicTrans");
    }
    preload(){

    }
    create(){
    
    }
}

class desert2 extends Phaser.Scene{
    constructor(){
        super("Desert2");
    }
    preload(){
        this.load.image('desertBg2', 'assets/backgrounds/dbg2.jpg');
        loadUserAvatar(this);
    }
    create(){
        console.log(this.scene.key);
        
        this.bg = this.add.image(1920/2, 1080/2, 'desertBg2').setOrigin(0.5, 0.5);
        //this.bg = this.add.image(1920/2, 1080/2, 'bg2').setOrigin(0.5, 0.5);
        this.bg.displayWidth = 1920;
        this.bg.displayHeight = 1080;
        console.log(this.textures.getPixel(200, 200, 'desertBg2'));
        console.log(this.textures.get('desertBg2').getSourceImage(0).height);
        console.log(this.physics.world.bounds);

        //To Left Scene
        this.arrows = this.add.sprite(50, 1080-200, 'arrows', 'up.png');
        this.arrows.setScale(3,3);
        this.mouse1ui = this.add.image(50, 1080-100, 'mouse1click');
        this.mouse1ui.setScale(2,2);
        this.leftSceneText = this.add.text(100, 1080-100, 'Desert 1', {font: '48px Courier'});
        this.leftSceneText.setFill('#0000ff');
        this.leftSceneText.setStroke('#fff', 4);
        
        /*
        //To Right Scene
        this.arrows2 = this.add.sprite(1920-50, 1080-200, 'arrows', 'up.png');
        this.arrows2.setScale(3,3);
        this.mouse1ui2 = this.add.image(1920-50, 1080-100, 'mouse1click');
        this.mouse1ui2.setScale(2,2);
        this.rightSceneText = this.add.text(1920-100, 1080-100, 'To Desert3', {font: '48px Courier', align: 'right'});
        this.rightSceneText.setFill('#0000ff');
        this.rightSceneText.setStroke('#fff', 4);
        this.rightSceneText.x = (1920-100) - this.rightSceneText.width;*/

        //set container
        globalBrain.variables.avatar = createUserAvatar(this);
        this.physics.world.enable(globalBrain.variables.avatar);
        this.physics.world.setFPS(60);
        
        playerMovement(this);
    }

    update(){
        playerClickMoveCheck();
        //changeSceneByEdge(this, "Desert3", 'right', 100, 1920);
        changeSceneByEdge(this, "PlayGame", 'left', 100, 1920);
    }
}