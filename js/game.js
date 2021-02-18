//@ts-check
var game;
var virtualGamePad;
var avatar;
var gameLogic;

// CONSTANTS
var MOVEUP = 0;
var MOVERIGHT = 1;
var MOVEDOWN = 2;
var MOVELEFT = 3;

var SPEEDWALK = 100;
var SPEEDRUN = 200;

window.onload = function(){
    var gameConfig = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        backgroundColor: 0x78BE20,
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [bootGame, userInterface, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize",resizeGame);
}

function resizeGame(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight +"px";
    }
}
