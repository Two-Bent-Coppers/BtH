//const { Input } = require("phaser.min");
//@ts-check
var game;
var virtualGamePad;
var avatar;
var gameLogic;

// Constants
const MoveUp = 0;
const MoveRight = 1;
const MoveDown = 2;
const MoveLeft = 3;

window.onload = function(){
    var gameConfig = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        backgroundColor: 0x78BE20,
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
