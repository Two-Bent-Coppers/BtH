//@ts-check
'use strict';

var CONSTANTS = {
    MOVEUP : 0,
    MOVERIGHT : 1,
    MOVEDOWN : 2,
    MOVELEFT : 3,

    SPEEDWALK : 400,
    SPEEDRUN : 800,
}

var variables = {
    virtualGamePad : undefined,
    avatar : undefined,
    targetPosition : new Phaser.Math.Vector2(),
    moveByMouse : false,
    gameLogic : undefined,
    surfaceTempImg: undefined,
    airTempImg : undefined
}

var globalBrain = {
    variables : variables,
    CONSTANTS : CONSTANTS
}
