//@ts-check
'use strict';
//export {createUI, createVirutalGamepad, handleMove, createUserAvatar};

function createUI(forScene){
    console.log('UI Loading');
    //user input display
    forScene.gamePad_Ui = forScene.add.container(80,80,
        [
            forScene.textDPadUp = forScene.add.text(0, -50, String.fromCharCode(globalBrain.variables.virtualGamePad.DPadUpBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
            forScene.textDPadDown = forScene.add.text(0, 0, String.fromCharCode(globalBrain.variables.virtualGamePad.DPadDownBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
            forScene.textDPadLeft = forScene.add.text(-50, 0, String.fromCharCode(globalBrain.variables.virtualGamePad.DPadLeftBind0.keyCode), {font: '32px Courier', fill: '#0000ff'}),
            forScene.textDPadRight = forScene.add.text(50, 0, String.fromCharCode(globalBrain.variables.virtualGamePad.DPadRightBind0.keyCode), {font: '32px Courier', fill: '#0000ff'})
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

function createVirutalGamepad(forScene){
    var newVirtualGamePad = { 
        //DPad
        DPadLeftBind0   : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        DPadLeftBind1   : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        DPadRightBind0  : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        DPadRightBind1  : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        DPadUpBind0     : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        DPadUpBind1     : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        DPadDownBind0   : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        DPadDownBind1   : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    
        //Action Buttons
        Action1Bind0    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        Action1Bind1    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
        Action2Bind0    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
        Action2Bind1    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
        Action3Bind0    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
        Action3Bind1    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
        Action4Bind0    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
        Action4Bind1    : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
    
        //Command Buttons
        StartBind0      : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK),
        StartBind1      : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
        SelectBind0     : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
        SelectBind1     : forScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS)    
    };

    return newVirtualGamePad;
}

function handleMove(key_Input, key_Bindings, user_Container){
    //console.log("Called from " + forScene);
    //console.log("Keyup: " + key_Input.keyCode);
    //console.log("Virtual Pad Test: " + key_Bindings.DPadLeftBind0.keyCode);
    //console.log("Current Avatar Position: " + user_Container.x);


    switch (key_Input.keyCode) {
        case key_Bindings.DPadLeftBind0.keyCode:
        case key_Bindings.DPadLeftBind1.keyCode:
            console.log('moving left');
            user_Container.body.setVelocity(-globalBrain.CONSTANTS.SPEEDWALK,0);
            break;

        case key_Bindings.DPadRightBind0.keyCode:
        case key_Bindings.DPadRightBind1.keyCode:
            console.log('moving right');
            user_Container.body.setVelocity(globalBrain.CONSTANTS.SPEEDWALK,0);
            break;

        case key_Bindings.DPadUpBind0.keyCode:
        case key_Bindings.DPadUpBind1.keyCode:
            console.log('moving up');
            user_Container.body.setVelocity(0,-globalBrain.CONSTANTS.SPEEDWALK);
            break;

        case key_Bindings.DPadDownBind0.keyCode:
        case key_Bindings.DPadDownBind1.keyCode:
            console.log('moving down');
            user_Container.body.setVelocity(0,globalBrain.CONSTANTS.SPEEDWALK);
            break;
    
        default:
            console.log("key input fail");
            break;
    }

}

function loadUserAvatar(forScene){
    forScene.load.image('body', 'assets/sprites/fa_73_300.png');
    forScene.load.image('hair1', 'assets/sprites/hair1.png');
}

function createUserAvatar(forScene){
    var avatar = forScene.add.container(960, 600,
        [
            forScene.add.sprite(0,0,'body'),
            forScene.add.sprite(0,-129,'hair1')
        ]
        ).setSize(73,310).setScale(2);
    return avatar;
}

function playerMovement(forScene){
    //Move by Keyboard input
    forScene.input.keyboard.on('keydown', function(event){
        handleMove(event, globalBrain.variables.virtualGamePad, globalBrain.variables.avatar);
    }, forScene)
    forScene.input.keyboard.on('keyup', function(event){
        globalBrain.variables.avatar.body.setVelocity(0,0);
    });


    //Move by Mouse input
    forScene.input.on('pointerup', function(pointer){
        globalBrain.variables.moveByMouse = true;
        globalBrain.variables.targetPosition.x = pointer.worldX;
        globalBrain.variables.targetPosition.y = pointer.worldY - (globalBrain.variables.avatar.height * globalBrain.variables.avatar.scale / 2);
        forScene.physics.moveToObject(globalBrain.variables.avatar, globalBrain.variables.targetPosition, globalBrain.CONSTANTS.SPEEDWALK);
    }, forScene);
}

function playerClickMoveCheck(){
    if (globalBrain.variables.moveByMouse){
        var dist = Phaser.Math.Distance.Between(globalBrain.variables.avatar.x, globalBrain.variables.avatar.y, globalBrain.variables.targetPosition.x, globalBrain.variables.targetPosition.y);

        if (globalBrain.variables.avatar.body.speed > 0){
            if (dist < 5){
                globalBrain.variables.avatar.body.reset(globalBrain.variables.targetPosition.x, globalBrain.variables.targetPosition.y);
                globalBrain.variables.moveByMouse = false;
            }   
        }

    }
}

function changeSceneByEdge(fromScene, toScene, side, width, bounds){
    if (side == 'left'){
        if (globalBrain.variables.avatar.x < width){
            globalBrain.variables.gameLogic.scene.launch(toScene);
            fromScene.scene.stop();
        }
    }

    if (side == 'right'){
        if (globalBrain.variables.avatar.x > bounds - width){
            globalBrain.variables.gameLogic.scene.launch(toScene);
            fromScene.scene.stop();
        }
    }
}