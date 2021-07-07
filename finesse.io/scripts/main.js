'use strict';

const KEY_DROP = 'FAST_DROP';
const KEY_LEFT = 'LEFT';
const KEY_RIGHT = 'RIGHT';
const KEY_DOWN = 'SOFT_DROP';
const KEY_CLOCK = 'ROTATE_C';
const KEY_COUNTERCLOCK = 'ROTATE_CC';
const KEY_HOLD =  'HOLD';
const KEY_MODE = 'MODE';
const KEY_START = 'START';

const GAME_MODE_0 = 0; // random pieces; reset on each drop
const GAME_MODE_1 = 1; // Z piece only; reset on each drop
const GAME_MODE_2 = 2; // S piece only; reset on each drop
const GAME_MODE_3 = 3; // Ipiece only ; reset on each drop
const GAME_MODE_4 = 4; // T piece only; reset on each drop
const GAME_MODE_5 = 5; // O piece only; reset on each drop
const GAME_MODE_6 = 6; // L piece only; reset on each drop
const GAME_MODE_7 = 7; // J piece only; reset on each drop
const GAME_MODE_8 = 8; // Normal Tetris; no gravity
const GAME_MODE_9 = 9; // Demo Play ? (mode 0 in auto - full TAS)

const DEMO_DELAY = 1;

var defaultKeyboardBindings = [
    ['arrowup', KEY_DROP],
    ['arrowdown', KEY_DOWN],
    ['arrowleft', KEY_LEFT],
    ['arrowright', KEY_RIGHT],
    ['keyx', KEY_CLOCK],
    ['keyz', KEY_COUNTERCLOCK],
    ['keyc', KEY_HOLD]
];
var keyboardBindings = [
    ['arrowup', KEY_DROP],
    ['arrowdown', KEY_DOWN],
    ['arrowleft', KEY_LEFT],
    ['arrowright', KEY_RIGHT],
    ['keyx', KEY_CLOCK],
    ['keyz', KEY_COUNTERCLOCK],
    ['keyc', KEY_HOLD]
];
var defaultControllerBindings = [
    [12, KEY_DROP],
    [13, KEY_DOWN],
    [14, KEY_LEFT],
    [15, KEY_RIGHT],
    [1, KEY_CLOCK],
    [0, KEY_COUNTERCLOCK],
    [5, KEY_HOLD]
];
var controllerBindings = [
    [12, KEY_DROP],
    [13, KEY_DOWN],
    [14, KEY_LEFT],
    [15, KEY_RIGHT],
    [1, KEY_CLOCK],
    [0, KEY_COUNTERCLOCK],
    [5, KEY_HOLD]
];

var gameMode = 0;

        var canvas = document.querySelector('canvas');
        const globalAlpha = 1;
        const ghostAlpha = 0.25;
        const targetAlpha = 0.25;
        canvas.width = 640;
        canvas.height = 640;
        var activeGamepad;
        
        var   showBoard = true;
        var   showInputs = false;
        var   pressedKeys = [];
        var   ARR_VALUE = 1;
        var   SDR_VALUE = 1;
        var   DAS_VALUE = 12;
        const DEF_LOCK_DELAY = 12;
        const MESSAGE_DURATION = 120;
        var isLeftDas = false;
        var isRightDas = false;
        const FPS = 60;
        const fpsInterval = 1000/ FPS;
        
        var g = canvas.getContext('2d');
 
        var right = { x: 1, y: 0 };
        var down = { x: 0, y: 1 };
        var left = { x: -1, y: 0 };
        var longPressDelay = DAS_VALUE;
        var DasCounter = ARR_VALUE;
        var lockDelay = DEF_LOCK_DELAY;
 
        var EMPTY = -1;
        var BORDER = -2;
        var clockwise = 1;
        var counterclockwise = -1;
 
        var fallingShape;
        var dim = 640;
        var nRows = 40;
        var nCols = 12;
        var blockSize = 30;
        var topMargin = -610;
        var leftMargin = 125;
        var scoreX = 10;
        var scoreY = 200;
        var settingsX = 470;
        var settingsY = 425;
        var titleX = 130;
        var titleY = 160;
        var clickX = 60;
        var clickY = 400;
        var previewCenterX = 550;
        var previewCenterY = 97;
        
        var bagCenterX = 440;
        var bagCenterY = 125;
        
        var holdCenterX = 46;
        var holdCenterY = 59;
        
        var messageCenterY = 600;
        var messageCenterX = 50;
        var keyStateArray = [];
        var keyPreviousStateArray = [];
        var actionArray = [];
        var previousActionArray = [];
        
        var mainFont = 'bold 48px monospace';
        var smallFont = 'bold 18px monospace';
        var colors = ['#FF0000', '#00FF00', 'cyan', 'purple', 'yellow', 'orange', 'blue', 'black'];
        var gridRect = { x: 150, y: 47, w: 308, h: 517 };
        var holdRect = { x: 30, y: 47, w: 100, h: 100 };
        var previewRect = { x: 490, y: 47, w: 120, h: 350 };
        var titleRect = { x: 100, y: 95, w: 320, h: 100 };
        var clickRect = { x: 50, y: 375, w: 252, h: 40 };
        var outerRect = { x: 5, y: 5, w: 630, h: 630 };
        var messageRect = { x: 30, y: 575, w: 575, h: 50 };
        var squareBorder = 'white';
        var titlebgColor = 'white';
        var textColor = 'black';
        var bgColor = '#DDEEFF';
        var gridColor = '#BECFEA';
        var gridBorderColor = '#7788AA';
        var largeStroke = 5;
        var smallStroke = 2;
 
        // position of falling shape
        var fallingShapeRow;
        var fallingShapeCol;
        var STARTING_COL = 4;
        var STARTING_ROW = 20;
        
        // position of the ghost
        var ghostRow;
 
        var currentMino = [];
        var grid = [];
        var targetGrid = [];
        var scoreboard = new Scoreboard();
        var bag = [];
        var nextBag = [];
        var moveList = [];
        var messages = [];
                
        var messageTime = MESSAGE_DURATION;
        var hold;
        var usedHold = false;
        var showGhost = true;
        
        function keydown(id)
        {
            actionArray[id] = true;
        }
        
        function keyup(id)
        {
            actionArray[id] = false;
        }
        
        window.addEventListener("gamepadconnected", function(e) {

            // Gamepad connected
            messages.push("Gamepad connected", e.gamepad.id);
            for (var i = 0; i < e.gamepad.buttons.length; i++)
            {
                previousButtonStates.push(false);
            }
          });
//        window.addEventListener("gamepaddisconnected", function(e) {

            // Gamepad disconnected
//            console.log("Gamepad disconnected", e.gamepad);
//          });
          
        
        
        addEventListener('click', function () {
            startNewGame();
            scoreboard.wipe();
            moveList = [];
        });
 
        addEventListener('keyup', function (event) {
            var code = event.code.toString().toLowerCase();
            keyStateArray[code] = false;
        });
        
var playerArrSetting;

        addEventListener('keydown', function (event) {
            var code = event.code.toString().toLowerCase();
            // prevent from down/up/space causing in-page navigation while playing...
            if (code !== "f12" && code !== "f5")
            {
                event.preventDefault();
            }
            if (code === "numpadmultiply")
            {
                exportSettings();
                return;
            }
            if (code === "numpadsubstract")
            {
                showGhost = !showGhost;
                return;
            }
            if (code === "numpadadd")
            {
                showBoard = !showBoard;
                return;
            }
            if (code === "f1")
            {
                showInputs = !showInputs;
                return;
            }
            if (code === "numpaddivide")
            {
                
                gameMode++;
                if (gameMode === GAME_MODE_9)
                {
                    playerArrSetting = ARR_VALUE;
                    ARR_VALUE = 0;
                }
                if (gameMode > GAME_MODE_9)
                {
                    ARR_VALUE = playerArrSetting;
                    gameMode = GAME_MODE_0;
                }
                
                initBags();
                selectShape();
                selectTarget();
                scoreboard.wipe();
                moveList = [];
                return;
            }
            keyStateArray[code] = true;
    });
 
    function resolveBindings(code)
    {
        for  (var i = 0; i < keyboardBindings.length; i++)
        {
            if (keyboardBindings[i][0] === code)
                return keyboardBindings[i][1];
        }

        for  (var i = 0; i < controllerBindings.length; i++)
        {
            if (controllerBindings[i][0] === code)
                return controllerBindings[i][1];
        }
    }
    
 
        function canRotate(s, direction) { 
            var tempShape = new Shape(s.x, s.y, s.matrix, s.ordinal, s.orientation);
            if (direction === clockwise){
               rotateClockwise(tempShape);
           } else {
               rotateCounterClockwise(tempShape);
           }
            
            
            var offsets = getOffsets(fallingShape.ordinal, fallingShape.orientation, tempShape.orientation);
            var tests = new Array(offsets.length);
            for (var i = 0; i < offsets.length; i++)
            {
                tests[i] = true;
                var offset = offsets[i];
                for (var y = 0; y < tempShape.matrix.length; y++)
                {
                    for (var x = 0; x < tempShape.matrix[y].length; x++)
                    {
                        if (fallingShapeRow + y + offset[1] < 0 || fallingShapeRow + y + offset[1] >= 40 || fallingShapeCol + x + offset[0] >= 12 || fallingShapeCol + x + offset[0] < 0)
                            tests[i] = false;
                        else
                        if (tempShape.matrix[y][x] === 1 && grid[fallingShapeRow + y + offset[1]][fallingShapeCol + x+ offset[0]] !== EMPTY)
                        {
                            tests[i] = false;
                        }
                    }
                }
                if (tests[i])
                {
                    break;
                }
            }
            for (var idx = 0; idx < tests.length; idx++){
                if (tests[idx] === true)
                {
                    var offset = offsets[idx];
                    fallingShapeRow += offset[1];
                    fallingShapeCol += offset[0];
                    return true;
                }
            }
            return false;
        }
        
        function rotate(s, direction) {
 
            if (direction === clockwise){
               rotateClockwise(s);
           } else {
               rotateCounterClockwise(s);
           }
        }
 
        function move(dir) {
            fallingShapeRow += dir.y;
            fallingShapeCol += dir.x;
        }
 
        function projectGhost(dir)
        {
            ghostRow += dir.y;
        }
        function canMove(s, dir) {
            for (var y = 0; y < s.matrix.length; y++)
            {
                for (var x = 0; x < s.matrix[y].length; x++){
                var newX = fallingShapeCol + dir.x + x;
                var newY = fallingShapeRow + dir.y + y;
                if (s.matrix[y][x] === 1)
                    if (grid[newY][newX] !== EMPTY || grid[newY][newX] === BORDER)
                        return false;
                }
            }
            return true;
        }
        function canMoveGhost(s, dir) {
            var can = true;
            for (var y = 0; y < s.matrix.length; y++)
            {
                for (var x = 0; x < s.matrix[y].length; x++){
                var newY = ghostRow + dir.y + y;
                if (s.matrix[y][x] === 1)
                    if (grid[newY][fallingShapeCol+ x] !== EMPTY)
                        can = false;
                }
            }
            return can;
        }
 
        function addShape(mino)
        {
            for (var y = 0; y < mino.matrix.length; y++){
                for (var x = 0; x < mino.matrix[y].length; x++)
                {
                    if (mino.matrix[y][x] === 1)
                        grid[fallingShapeRow + y][fallingShapeCol + x] = fallingShape.ordinal;
                }
            }
        }
        function shapeHasLanded(fastDown = false) {
            
            usedHold = false;
            
            if (gameMode === GAME_MODE_9)
            {
                currentMove = 0;
                demoDelay = DEMO_DELAY;
            }
            
        if (!fastDown)
        {
            lockDelay --;
            if (lockDelay <= 0)
            {
                lockDelay = DEF_LOCK_DELAY;
                if (gameMode < 8)
                {               
                    if (compareMoves(moveList, targetMoves))
                    {
                        scoreboard.addScore(1);
                        scoreboard.addCorrect(1);
                        scoreboard.addLines(1);
                        scoreboard.addTotal();
                    }
                    else
                    {
                        var message = "Expected Moves: ";
                        for (var i = 0; i < targetMoves.length; i++)
                        {
                            message += targetMoves[i] + "\n";
                        }
                        messages.push(message);
                        scoreboard.comboBroke();
                        scoreboard.addTotal();
                    }
                }
                else
                {
                    var moves = fallingShape.getMoves(fallingShapeCol);
                        if (compareMoves(moveList, moves))
                        {
                            scoreboard.addCorrect(1);
                            scoreboard.addScore(1);
                            scoreboard.addLines(1);
                            scoreboard.addTotal();
                        }
                        else {
                            var message = "Expected Moves: ";
                            for (var i = 0; i < moves.length; i++)
                            {
                                message += moves[i] + "\n";
                                console.log(moves[i]);
                            }
                            messages.push(message);
                            scoreboard.comboBroke();
                            scoreboard.addTotal();
                        }
                }
                
                moveList = [];
                addShape(fallingShape);
                if (fallingShapeRow < 2) {
                    scoreboard.setGameOver();
                    scoreboard.setTopscore();
                } else {
                    removeLines();
    //                scoreboard.addLines();
                }
                if (gameMode <= GAME_MODE_7)
                {
                    startNewGame();
                }
                else if (gameMode === GAME_MODE_9)
                {
                    startNewGame();
                }
                else{
                    selectShape();
                    selectTarget(); 
                }
            }
        }
        else
        {
            lockDelay = DEF_LOCK_DELAY;
            if (gameMode < 8)
            {
                if (compareMoves(moveList, targetMoves))
                {
                    scoreboard.addScore(1);
                    scoreboard.addCorrect(1);
                    scoreboard.addLines(1);
                    scoreboard.addTotal();
                }
                else
                {
                    var message = "Expected Moves: ";
                    for (var i = 0; i < targetMoves.length; i++)
                    {
                        message += targetMoves[i] + "\n";
                    }
                    messages.push(message);
                    scoreboard.comboBroke();
                    scoreboard.addTotal();
                }
            }
            else
            {
                var moves = fallingShape.getMoves(fallingShapeCol);
                    if (compareMoves(moveList, moves))
                    {
                        scoreboard.addCorrect(1);
                        scoreboard.addScore(1);
                        scoreboard.addLines(1);
                        scoreboard.addTotal();
                    }
                    else {
                        var message = "Expected Moves: ";
                        for (var i = 0; i < moves.length; i++)
                        {
                            message += moves[i] + "\n";
                        }
                        messages.push(message);
                        scoreboard.comboBroke();
                        scoreboard.addTotal();
                    }
            }
            moveList = [];
            addShape(fallingShape);
            if (fallingShapeRow < 2) {
                scoreboard.setGameOver();
                scoreboard.setTopscore();
            } else {
                removeLines();
//                scoreboard.addLines();
            }
            if (gameMode <= GAME_MODE_7)
            {
                startNewGame();
            }
            else if (gameMode === GAME_MODE_9)
            {
                startNewGame();
            }
            else{
                selectShape();
                selectTarget(); 
            }
       }
   }
 
        function removeLines() {
            var count = 0;
            for (var r = 0; r < nRows - 1; r++) {
                for (var c = 1; c < nCols - 1; c++) {
                    if (grid[r][c] === EMPTY)
                        break;
                    if (c === nCols - 2) {
                        count++;
                        removeLine(r);
                    }
                }
            }
            return count;
        }
 
        function removeLine(line) {
            for (var c = 0; c < nCols; c++)
                grid[line][c] = EMPTY;
 
            for (var c = 0; c < nCols; c++) {
                for (var r = line; r > 0; r--)
                    grid[r][c] = grid[r - 1][c];
            }
        }
 
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    function initBags()
    {
        bag = [];
        nextBag = [];
                switch (gameMode)
                {
                    case 1:
                        bag.push(0);
                        nextBag.push(0);
                        break;
                    case 2:
                        bag.push(1);
                        nextBag.push(1);
                        break;
                    case 3:
                        bag.push(2);
                        nextBag.push(2);
                        break;
                    case 4:
                        bag.push(3);
                        nextBag.push(3);
                        break;
                    case 5:
                        bag.push(4);
                        nextBag.push(4);
                        break;
                    case 6:
                        bag.push(5);
                        nextBag.push(5);
                        break;
                    case 7:
                        bag.push(6);
                        nextBag.push(6);
                        break;
                    default:
                        bag.push(0, 1, 2, 3, 4, 5, 6);
                        nextBag.push(0, 1, 2, 3, 4, 5, 6);
                        break;
                }
                shuffleArray(bag);
                shuffleArray(nextBag);
            }
        function getRandomShape() {
            if (bag.length === 0)
            {
                while (nextBag.length > 0)
                {
                    bag.push(nextBag.shift());
                }
                switch (gameMode)
                {
                    case 1:
                        nextBag.push(0);
                        break;
                    case 2:
                        nextBag.push(1);
                        break;
                    case 3:
                        nextBag.push(2);
                        break;
                    case 4:
                        nextBag.push(3);
                        break;
                    case 5:
                        nextBag.push(4);
                        break;
                    case 6:
                        nextBag.push(5);
                        break;
                    case 7:
                        nextBag.push(6);
                        break;
                    default:
                        nextBag.push(0, 1, 2, 3, 4, 5, 6);
                        break;
                }
                shuffleArray(nextBag);
            }
            var ord = bag.shift();
            var shape = minos[ord];
            var moves = MOVES[ord];
            return new Shape(fallingShapeCol, fallingShapeRow, shape, ord, 0, moves);
        }
 
        function selectShape() {
            fallingShapeRow = STARTING_ROW;
            fallingShapeCol = STARTING_COL;
            ghostRow = 1;
            fallingShape = getRandomShape();
        }
 
        function Scoreboard() {
            this.MAXLEVEL = 9;
 
            var level = 0;
            var lines = 0;
            var score = 0;
            var topscore = 0;
            var gameOver = true;
            var total = 0;
            var correct = 0;
            
            this.addTotal = function()
            {
                total += 1;
            };
            
            this.wipe = function()
            {
                topscore = level = lines = score = total = correct = 0;
                
            };
            
            this.getTotal = function()
            {
                return total;
            };
 
            this.comboBroke = function()
            {
                this.setTopscore();
                level = score = lines = 0;
            };
 
            this.reset = function () {
                gameOver = false;
            };
 
            this.setGameOver = function () {
                gameOver = true;
            };
 
            this.isGameOver = function () {
                return gameOver;
            };
 
            this.setTopscore = function () {
                if (lines > topscore) {
                    topscore = score;
                }
            };
 
            this.getTopscore = function () {
                return topscore;
            };
 
            this.getSpeed = function () {
 
                switch (level) {
                    default: return 10000;
                }
            };
 
            this.addScore = function (sc) {
                score += sc;
            };
 
            this.addLines = function (line) {
                lines += line;
            };
 
            this.addCorrect = function(number) {
                correct += number;
            };
 
            this.getCorrect = function(){
                return correct;
            };
            this.addLevel = function () {
                lines %= 10;
                if (level < this.MAXLEVEL) {
                    level++;
                }
            };
 
            this.getLevel = function () {
                return level;
            };
 
            this.getLines = function () {
                return lines;
            };
 
            this.getScore = function () {
                return score;
            };
        }
 
        function draw() {
            g.clearRect(0, 0, canvas.width, canvas.height);
 
            drawUI();
 
            if (scoreboard.isGameOver()) {
                drawStartScreen();
            } else {
                drawFallingShape();
                if (showGhost)
                    drawGhost();
                
                if (gameMode === 8)
                {
                    drawHold();
                    drawBag();
                } else
                {
                    drawTarget();
                    drawTargetMoves();
                }
            }
        }
 
        function drawHold()
        {
 
//            g.translate(cx, cy);
//            nextShape.shape.forEach(function (p) {
//                drawSquare(nextShape.ordinal, p[1], p[0]);
//            });
//            g.translate(-cx, -cy);
            if (hold !== undefined)
            {
                
                var bs = blockSize * 0.8;
                var blockCount = hold.matrix.length;
                var cx = holdCenterX - ((blockCount + 1) / 2.0 * bs);
                var cy = holdCenterY - ((blockCount + 1) / 2.0 * bs);
                
            g.translate(cx, cy);
                for (var y = 0; y < hold.matrix.length; y++){
                    for (var x = 0; x < hold.matrix[y].length; x++)
                    {
                        if (hold.matrix[y][x] === 1)
                            drawHoldSquare(hold.ordinal, y, x, bs);
                    }
                }
            g.translate(-cx, -cy);
            }
        }
        
        function drawBag()
        {
            var allItems = [];
            for (var i = 0; i < bag.length; i++)
            {
                allItems.push(bag[i]);
            }
            for (var i = 0; i < nextBag.length; i++)
            {
                allItems.push(nextBag[i]);
            }
            var bagItems = Math.min(allItems.length, 5);
            for (var i = 0; i < bagItems; i++)
            {
                drawBagItem(allItems[i], i);
            }
        }
        function drawBagItem(ordinal, place)
        {
            var bs = place === 0 ? 0.8 : 0.5;
            var item = minos[ordinal];
                for (var y = 0; y < item.length; y++){
                    for (var x = 0; x < item[y].length; x++)
                    {
                        if (item[y][x] === 1)
                            drawBagSquare(ordinal, y, x, bs, place);
                    }
                }
            
        }
        
        function drawBagSquare(ordinal, r, c, bs, place)
        {
            var blockCount = minos[ordinal].length;
            var cx = bagCenterX - ((blockCount + 1) / 2.0 * bs * blockSize);
            var cy = bagCenterY - ((blockCount + 1) / 2.0 * bs * blockSize) + blockSize * 2 * place;
            g.translate(cx, cy);

            g.fillStyle = colors[ordinal];
            g.fillRect(leftMargin + c * bs * blockSize,  r * bs * blockSize, bs * blockSize, bs * blockSize);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(leftMargin + c * bs * blockSize,  r * bs * blockSize, bs * blockSize, bs * blockSize);
            g.translate(-cx, -cy);
        }
 
        function drawStartScreen() {
            g.font = mainFont;
 
            fillRect(titleRect, titlebgColor);
            fillRect(clickRect, titlebgColor);
 
            g.fillStyle = textColor;
            g.fillText('Finesse.io', titleX, titleY);
 
            g.font = smallFont;
            g.fillText('click anywhere to start', clickX, clickY);
        }
 
        function fillRect(r, color) {
            g.fillStyle = color;
            g.fillRect(r.x, r.y, r.w, r.h);
        }
 
        function drawRect(r, color) {
            g.strokeStyle = color;
            g.strokeRect(r.x, r.y, r.w, r.h);
        }
 
        function drawSquare(colorIndex, r, c) {
            var bs = blockSize;
            //g.fillStyle = colors[colorIndex];
            g.fillStyle = colors[colorIndex];
            g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
        }
        
        function drawGridSquare(r, c) {
            var bs = blockSize;
            g.globalAlpha = ghostAlpha;
            g.fillStyle = "#DDDDDD";
            g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
            g.globalAlpha = globalAlpha;
        }
        function drawHoldSquare(colorIndex, r, c, bs)
        {
            g.fillStyle = colors[colorIndex];
            g.fillRect(holdCenterX + c * bs, holdCenterY + r * bs, bs, bs);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(holdCenterX + c * bs, holdCenterY + r * bs, bs, bs);
            
        }
        function drawGhostSquare(colorIndex, r, c) {
            var bs = blockSize;
            g.globalAlpha = ghostAlpha;
            g.fillStyle = colors[colorIndex];
            g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
            
            g.globalAlpha = globalAlpha;
        }
        function drawTargetSquare(r, c) {
            var bs = blockSize;
            g.fillStyle = "#000000";
            g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
 
            g.lineWidth = smallStroke;
            g.strokeStyle = "#FFFFFF";
            g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
        }
 
        function drawUI() {
 
            // background
            fillRect(outerRect, bgColor);
            fillRect(gridRect, gridColor);
 
            // the blocks dropped in the grid
            for (var r = 0; r < nRows; r++) {
                for (var c = 0; c < nCols; c++) {
                    var idx = grid[r][c];
                    if (idx > EMPTY && showBoard)
                        drawSquare(colors.length - 1, r, c);
                    else if (idx != BORDER)
                        drawGridSquare(r, c);
                }
            }
 
            // the borders of grid and preview panel
            g.lineWidth = largeStroke;
            drawRect(gridRect, gridBorderColor);
            drawRect(previewRect, gridBorderColor);
            drawRect(outerRect, gridBorderColor);
            drawRect(holdRect, gridBorderColor);
            drawRect(messageRect, gridBorderColor);
 
            // scoreboard
            g.fillStyle = textColor;
            g.font = smallFont;
            g.fillText('current mode: ', scoreX, scoreY);
            switch(gameMode)
            {
                case GAME_MODE_0:
                    g.fillText( "All Random", scoreX, scoreY+15);
                    break;
                case GAME_MODE_1:
                    g.fillText( "Z Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_2:
                    g.fillText( "S Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_3:
                    g.fillText( "I Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_4:
                    g.fillText( "T Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_5:
                    g.fillText( "O Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_6:
                    g.fillText( "L Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_7:
                    g.fillText( "J Only", scoreX, scoreY+15);
                    break;
                case GAME_MODE_8:
                    g.fillText( "Free Stacking", scoreX, scoreY+15);
                    break;
                case GAME_MODE_9:
                    g.fillText( "Auto Mode", scoreX, scoreY+15);
                    break;
            }
            g.fillText('top combo: ', scoreX, scoreY + 30);
            g.fillText( scoreboard.getTopscore(), scoreX, scoreY + 45);
            g.fillText('combo: ', scoreX, scoreY + 60);
            g.fillText(+ scoreboard.getLines(), scoreX, scoreY + 75);
            g.fillText('score: ', scoreX, scoreY + 90);
            g.fillText(scoreboard.getScore(), scoreX, scoreY + 105);
            g.fillText('total pieces: ', scoreX, scoreY + 120);
            g.fillText( scoreboard.getTotal(), scoreX, scoreY + 135);
            if (scoreboard.getTotal() !== 0)
            {
                g.fillText('Correct: ', scoreX, scoreY + 150);
                g.fillText(scoreboard.getCorrect(), scoreX, scoreY + 165);
                g.fillText('finesse (%): ', scoreX, scoreY + 180);
                g.fillText(Math.floor((100*scoreboard.getCorrect() / scoreboard.getTotal())), scoreX, scoreY + 195);
            }
            if (showInputs)
            {
                var offset = 15;
                g.fillText('Inputs:', scoreX, scoreY + 195 + offset);
                offset += 15;
                for (var i = 0; i < pressedKeys.length; i++)
                {
                    var input = pressedKeys[i];
                    g.fillText(input, scoreX, scoreY + 195 + offset);
                    offset += 15;
                }
            }
            g.fillText( scoreboard.getTotal(), scoreX, scoreY + 135);

            g.fillText('ARR:', settingsX, settingsY);
            if (ARR_VALUE >= 0)
            {
                g.fillText(ARR_VALUE + (ARR_VALUE === 1 ? ' frame':' frames'), settingsX, settingsY+15);
            }
            else
            {
                g.fillText('IMMEDIATE (-1)', settingsX, settingsY+15);
            }
            g.fillText('DAS:', settingsX, settingsY+30);
            g.fillText(DAS_VALUE + (DAS_VALUE === 1 ? ' frame':' frames'), settingsX, settingsY+45);
            g.fillText('SDR:', settingsX, settingsY+60);
            if (SDR_VALUE >= 0)
            {
                g.fillText(SDR_VALUE + (SDR_VALUE === 1 ? ' frame':' frames'), settingsX, settingsY+75);
            }
            else
            {
                g.fillText('IMMEDIATE (-1)', settingsX, settingsY+75);
            }

            if (messages.length > 0)
            {
                var message = messages[0];
                messageTime--;
                g.globalAlpha = messageTime / MESSAGE_DURATION;
                g.fillText(message, messageCenterX, messageCenterY);
                g.globalAlpha = globalAlpha;
                if (messageTime === 0)
                {
                    messages.shift();
                    messageTime = MESSAGE_DURATION;
                }
            }

        }
 
        function drawFallingShape() {
            for (var y = 0; y < fallingShape.matrix.length; y++){
                for (var x = 0; x < fallingShape.matrix[y].length; x++)
                {
                    if (fallingShape.matrix[y][x] === 1)
                        drawSquare(fallingShape.ordinal, fallingShapeRow + y, fallingShapeCol + x);
                }
            }
        }
        
        function drawGhost() {
            g.globalAlpha = ghostAlpha;
            ghostRow = fallingShapeRow;
            while(canMoveGhost(fallingShape, down))
            {
                projectGhost(down);
            }
            
            for (var y = 0; y < fallingShape.matrix.length; y++){
                for (var x = 0; x < fallingShape.matrix[y].length; x++)
                {
                    if (fallingShape.matrix[y][x] === 1)
                        drawGhostSquare(fallingShape.ordinal, ghostRow + y, fallingShapeCol + x);
                }
            }
            g.globalAlpha = globalAlpha;;
        }
var previousButtonStates = [];
var demoButtonPressed = false;
var now;
var elapsed;
var then = Date.now();
function loop(timestamp) {
 
    requestAnimationFrame(loop);
    
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval)
    {
        
        then = now - (elapsed % fpsInterval);
  // game mode 9: demo/auto mode this breaks if ARR is set to 0
        if (gameMode === GAME_MODE_9)
        {
            if (targetMoves.length !== 0)
            {
                if (demoDelay === 0)
                {
                    var cm = targetMoves[0][currentMove];
                    switch (cm)
                    {
                    case DAS_RIGHT:
                        if (!demoButtonPressed)
                        {
                            keydown(KEY_RIGHT);
                            demoButtonPressed = true;
                        }
                        else 
                        {
                            if (isRightDas)
                            {
                                keyup(KEY_RIGHT);
                                demoButtonPressed = false;
                                currentMove++;
                                demoDelay = DEMO_DELAY;
                            }
                        }
                        break;
                    case RIGHT:
                        if (!demoButtonPressed)
                        {
                            keydown(KEY_RIGHT);
                            demoButtonPressed = true;
                        } else
                        {
                            keyup(KEY_RIGHT);
                            demoButtonPressed = false;
                            currentMove++;
                            demoDelay = DEMO_DELAY;
                        }
                        break;
                    case LEFT:
                        if (!demoButtonPressed)
                        {
                            keydown(KEY_LEFT);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            keyup(KEY_LEFT);
                            demoButtonPressed = false;
                            currentMove++;
                            demoDelay = DEMO_DELAY;
                        }
                        break;
                    case DAS_LEFT:
                        if (!demoButtonPressed)
                        {
                            keydown(KEY_LEFT);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            if (isLeftDas)
                            {
                                keyup(KEY_LEFT);
                                demoButtonPressed = false;
                                currentMove++;
                                demoDelay = DEMO_DELAY;
                            }
                        }
                        break;
                    case DROP:
                        while(canMove(fallingShape, down))
                        {
                            move(down);
                        }
                        moveList.push(DROP);
                        shapeHasLanded(true);
                        break;
                    case ROTATE_CLOCK:
                        if (!demoButtonPressed)
                        {
                            keydown(KEY_CLOCK);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            keyup(KEY_CLOCK);
                            currentMove++;
                            demoButtonPressed = false;
                            demoDelay = DEMO_DELAY;
                        }
                    break;
                  case ROTATE_COUNTER:
                      if (!demoButtonPressed)
                      {
                          keydown(KEY_COUNTERCLOCK);
                          demoButtonPressed = true;
                      }
                      else
                      {
                          keyup(KEY_COUNTERCLOCK);
                          currentMove++;
                          demoButtonPressed = false;
                          demoDelay = DEMO_DELAY;
                      }
                      break;
                  }
              }
              else 
              {
                  demoDelay--;
              }
          }
        }
        // handle inputs
        // NOTE: Inputs are parsed into actions to be performed
        // And will be processed exactly once per frame.
        // If keyboard and controller perform an input, they'll be performed exactly once.
        // If both keyboard and controller perform the same input, it'll be performed only once.

        // handle gamepad inputs
        if(navigator.getGamepads()) {
            var gp = navigator.getGamepads()[0];
            if (gp !== undefined && gp !== null)
            {
                for (var b = 0; b < gp.buttons.length; b++)
                {
                    if (previousButtonStates[b] === undefined)
                    {
                        previousButtonStates[b] = false;
                    }
                    readInput(b, gp.buttons[b].pressed, previousButtonStates[b]);
                    previousButtonStates[b] = gp.buttons[b].pressed;
                }
            }
        }

        // handle keyboard inputs
        for (const key of Object.keys(keyStateArray))
        {
            if (keyPreviousStateArray[key]=== undefined)
            {
                keyPreviousStateArray[key] = false;
            }
            readInput(key, keyStateArray[key], keyPreviousStateArray[key]);
            keyPreviousStateArray[key] = keyStateArray[key];
        }

        // process input actions
        for (const key of Object.keys(actionArray))
        {
            var prev = previousActionArray[key];
            var curr = actionArray[key];
            handleInput(key, prev, curr);
            previousActionArray[key] = actionArray[key];
        }

        draw();
    }
}
function readInput(input, curr, prev)
{
    var key = resolveBindings(input);
    if (prev === false && curr === true)
    {
        if (showInputs)
        {
            pressedKeys.push(input);
        }
        keydown(key);
    }
    else 
    if (prev === true && curr === false)
    {
        if (showInputs)
        {
            pressedKeys = pressedKeys.filter( e => e !== input);
        }
        keyup(key);
    }
}
var sdr = SDR_VALUE;

function handleInput(code, prev, curr)
{
    switch (code)
    {
        case KEY_LEFT:
            // holding left
            if (curr && !prev)
            {
                if (canMove(fallingShape, left))
                    move(left);
                DasCounter = ARR_VALUE;
                longPressDelay = DAS_VALUE;
            }
            if (prev && curr)
            {
                // reduce the DAS counter
                // if DAS counter = 0
                // move the piece towards the wall
                // every ARR frames
                longPressDelay--;
                if (longPressDelay <= 0)
                {
                    DasCounter--;
                    if (DasCounter <= 0)
                    {
                        
                        if (ARR_VALUE === -1)
                        {
                            // if ARR is set to -1, tuck the piece to the wall right away.
                            while(canMove(fallingShape, left))
                            {
                                move(left);
                            }
                            isLeftDas = true;
                        }
                        else
                        {
                            if (canMove(fallingShape, left))
                                move(left);
                            else
                                isLeftDas = true;
                            DasCounter = ARR_VALUE;
                        }
                    }
                }            
            }
            if (prev && !curr)
            {
                if (isLeftDas)
                    moveList.push(DAS_LEFT);
                else
                    moveList.push(LEFT);
                isLeftDas = false;
            }    
            break;
        case KEY_RIGHT:
            
            // holding left
            if (curr && !prev)
            {
                if (canMove(fallingShape, right))
                    move(right);
                DasCounter = ARR_VALUE;
                longPressDelay = DAS_VALUE;
            }
            if (prev && curr)
            {
                // reduce the DAS counter
                // if DAS counter = 0
                // move the piece towards the wall
                // every ARR frames
                longPressDelay--;
                if (longPressDelay <= 0)
                {
                    DasCounter--;
                    if (DasCounter <= 0)
                    {
                        
                        if (ARR_VALUE === -1)
                        {
                            // if ARR is set to -1, tuck the piece to the wall right away.
                            while(canMove(fallingShape, right))
                            {
                                move(right);
                            }
                            isRightDas = true;
                        }
                        else
                        {
                            if (canMove(fallingShape, right))
                                move(right);
                            else
                                isRightDas = true;
                            DasCounter = ARR_VALUE;
                        }
                    }
                }            
            }
            if (prev && !curr)
            {
                if (isRightDas)
                    moveList.push(DAS_RIGHT);
                else
                    moveList.push(RIGHT);
                isRightDas = false;
            }    
            break;
        case KEY_DOWN:
            if (curr && !prev)
            {
                if (SDR_VALUE === -1)
                {
                    while (canMove(fallingShape, down) )
                    {
                        move(down);
                    }
                }
                else 
                {
                    if (canMove(fallingShape, down))
                    {
                        move(down);
                    }
                    sdr = SDR_VALUE;
                }
            }
            // holding down
            if (prev && curr)
            {
                if (SDR_VALUE === -1)
                {
                    while (canMove(fallingShape, down) )
                    {
                        move(down);
                    }
                }
                else
                {
                    sdr--;
                    if (canMove(fallingShape, down))
                    {
                        if (sdr < 0)
                        {
                            move(down);
                            sdr = SDR_VALUE;
                        }
                    }
                }
            }
            if (prev && !curr)
            {
                moveList.push(SOFT_DROP);
            }    
            break;
        case KEY_DROP:
            if (curr && !prev)
            {
                while (canMove(fallingShape, down) )
                {
                    move(down);
                }
                moveList.push(DROP);
                shapeHasLanded(true);
            }
            break;
        case KEY_CLOCK:
            if (curr && !prev)
            {
                if (canRotate(fallingShape, clockwise))
                {
                    rotate(fallingShape, clockwise);
                }
                moveList.push(ROTATE_CLOCK);
            }
            break;
        case KEY_COUNTERCLOCK:
            if (curr && !prev)
            {
                if (canRotate(fallingShape, counterclockwise))
                {
                    rotate(fallingShape, counterclockwise);
                }
                moveList.push(ROTATE_COUNTER);
            }
            break;
        case KEY_HOLD:
            
            if (curr && !prev)
            {
                if (gameMode !== 8)
                    break;
                // hold
                if (usedHold)
                    break;

                if (hold === undefined)
                {
                    // empty hold = hold current piece and get a new one from the bag
                    hold = fallingShape;
                    for (var orient = fallingShape.orientation; orient > 0; orient--)
                    {
                        rotate(hold, counterclockwise);
                    }
                    selectShape();
                }
                else 
                {
                    // not empty hold = swap pieces;
                    var tmp = fallingShape;
                    for (var orient = fallingShape.orientation; orient > 0; orient--)
                    {
                        rotate(tmp, counterclockwise);
                    }
                    fallingShape = hold;
                    hold = tmp;

                }
                usedHold = true;
                fallingShapeRow = STARTING_ROW;
                fallingShapeCol = STARTING_COL;
                moveList = [];
            }
            break;
        default:
            break;
    }
}
window.requestAnimationFrame(loop);

var targetShape;
var targetCol;
var targetRow;
var targetMoves = [];
var currentMove = 0;
var demoDelay = 5;
        function selectTarget()
        {
            if (gameMode === 8)
            {
                targetShape = undefined;
                return;
            }
            var idx = fallingShape.ordinal;
            // mino
            var libraryData = library[idx];
            // rotation
            var number = Math.floor(Math.random()*libraryData.length);
            // rotation
            var targetRotation = Math.floor(Math.random()*libraryData[number].length);
            var mino = minos[idx];
            if (number < MOVES[idx].length)
            {
                targetMoves = MOVES[idx][number][targetRotation];
            }
            else
                targetMoves = [];
            targetCol = libraryData[number][targetRotation][0];
            targetRotation = libraryData[number][targetRotation][1];
            targetRow = libraryData[number][targetRotation][2];
            targetShape =  new Shape(targetCol, targetRow, mino, idx, 0, targetMoves);
            for (var i = 0; i < targetRotation; i++)
            {
                rotate(targetShape, clockwise);
            }
        }
        
        function drawTargetMoves()
        {
            if (targetMoves.length <= 0)
                return;
            
            var cx = previewCenterX - 50;
            var cy = previewCenterY ;
            // scoreboard
            g.fillStyle = textColor;
            g.font = smallFont;
            for (var t = 0; t < targetMoves.length; t++)
            {
                var text = "";
                for (var i = 0; i < targetMoves[t].length; i++)
                {
                    text += targetMoves[t][i] +" ";
                    
                }
                    g.fillText(text, cx, cy);
                    cy += 30;   
            }
        }
        function drawTarget() {
            if ( targetShape === undefined)
                return;
            g.globalAlpha = targetAlpha;
            
            for (var y = 0; y < targetShape.matrix.length; y++){
                for (var x = 0; x < targetShape.matrix[y].length; x++)
                {
                    if (targetShape.matrix[y][x] === 1)
                        drawTargetSquare( targetRow + y, targetCol + x);
                }
            }
            g.globalAlpha = globalAlpha;
        }
        
        function startNewGame() {
            hold = undefined;
            usedHold = false;
            initGrid();
            initTargetGrid();
            initBags();
            selectShape();
            selectTarget();
            scoreboard.reset();
        }
 
        function initGrid() {
            function fill(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = value;
                }
            }
            for (var r = 0; r < nRows; r++) {
                grid[r] = new Array(nCols);
                fill(grid[r], EMPTY);
                for (var c = 0; c < nCols; c++) {
                    if (c === 0 || c === nCols - 1 || r === nRows - 1)
                        grid[r][c] = BORDER;
                }
            }
        }
        function initTargetGrid() {
            function fill(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = value;
                }
            }
            for (var r = 0; r < nRows; r++) {
                targetGrid[r] = new Array(nCols);
                fill(targetGrid[r], EMPTY);
                for (var c = 0; c < nCols; c++) {
                    if (c === 0 || c === nCols - 1 || r === nRows - 1)
                        targetGrid[r][c] = BORDER;
                }
            }
        }
 
        function init() {
            gameMode = 0;
            initGrid();
            initTargetGrid();
            draw();
        }
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success!
  function handleJSONDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
      // Loop through the FileList and read
      for (var i = 0, f; f = files[i]; i++) {
  
        // Only process json files.
          if (!f.type.match('application/json')) {
              console.log(f.name + " is not a json file.");
          continue;
        }
  
        var reader = new FileReader();
  
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            var p = JSON.parse(e.target.result);
            importSettings(p);
          };
        })(f);
  
        reader.readAsText(f);
      }
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementsByTagName('body')[0];
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleJSONDrop, false);
  

} else {
  alert('The File APIs are not fully supported in this browser.');
}

    function getKeyboardInputForCode(code)
    {
        for  (var i = 0; i < keyboardBindings.length; i++)
        {
            if (keyboardBindings[i][1] === code)
                return keyboardBindings[i][0];
        }
    }

    function getControllerInputForCode(code)
    {
        for  (var i = 0; i < controllerBindings.length; i++)
        {
            if (controllerBindings[i][1] === code)
                return controllerBindings[i][0];
        }
    }
function exportSettings()
{
    var settings = {};
    settings.keybinds = {};
    settings.keybinds.keyboard = 
            {
                KEY_DROP: getKeyboardInputForCode(KEY_DROP),
                KEY_DOWN: getKeyboardInputForCode(KEY_DOWN),
                KEY_LEFT: getKeyboardInputForCode(KEY_LEFT),
                KEY_RIGHT: getKeyboardInputForCode(KEY_RIGHT),
                KEY_CLOCK: getKeyboardInputForCode(KEY_CLOCK),
                KEY_COUNTERCLOCK: getKeyboardInputForCode(KEY_COUNTERCLOCK),
                KEY_HOLD: getKeyboardInputForCode(KEY_HOLD)
            };
    settings.keybinds.controller = 
            {
                KEY_DROP: getControllerInputForCode(KEY_DROP),
                KEY_DOWN: getControllerInputForCode(KEY_DOWN),
                KEY_LEFT: getControllerInputForCode(KEY_LEFT),
                KEY_RIGHT: getControllerInputForCode(KEY_RIGHT),
                KEY_CLOCK: getControllerInputForCode(KEY_CLOCK),
                KEY_COUNTERCLOCK: getControllerInputForCode(KEY_COUNTERCLOCK),
                KEY_HOLD: getControllerInputForCode(KEY_HOLD)
            };
    settings.handling = {
        'SDR_VALUE': SDR_VALUE,
        'ARR_VALUE': ARR_VALUE,
        'DAS_VALUE': DAS_VALUE
        
    }
    const filename = 'settings.json';
    const jsonStr = JSON.stringify(settings, null, 2);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function importSettings(settings)
{
    if (settings.keybinds.keyboard)
    {
        var keybinds = settings.keybinds.keyboard;
        keyboardBindings = [];
        keyboardBindings.push([keybinds.KEY_DROP, KEY_DROP]);
        keyboardBindings.push([keybinds.KEY_DOWN, KEY_DOWN]);
        keyboardBindings.push([keybinds.KEY_LEFT, KEY_LEFT]);
        keyboardBindings.push([keybinds.KEY_RIGHT, KEY_RIGHT]);
        keyboardBindings.push([keybinds.KEY_CLOCK, KEY_CLOCK]);
        keyboardBindings.push([keybinds.KEY_COUNTERCLOCK, KEY_COUNTERCLOCK]);
        keyboardBindings.push([keybinds.KEY_HOLD, KEY_HOLD]);
    }
    if (settings.keybinds.controller)
    {
        var keybinds = settings.keybinds.controller;
        controllerBindings = [];
        controllerBindings.push([keybinds.KEY_DROP, KEY_DROP]);
        controllerBindings.push([keybinds.KEY_DOWN, KEY_DOWN]);
        controllerBindings.push([keybinds.KEY_LEFT, KEY_LEFT]);
        controllerBindings.push([keybinds.KEY_RIGHT, KEY_RIGHT]);
        controllerBindings.push([keybinds.KEY_CLOCK, KEY_CLOCK]);
        controllerBindings.push([keybinds.KEY_COUNTERCLOCK, KEY_COUNTERCLOCK]);
        controllerBindings.push([keybinds.KEY_HOLD, KEY_HOLD]);
    }
    if (settings.handling)
    {
        var handling = settings.handling;
        SDR_VALUE = handling.SDR_VALUE;
        if (gameMode === 9)
        {
            playerArrSetting = handling.ARR_VALUE;
        }
        else
        {
            ARR_VALUE = handling.ARR_VALUE;
        }
        DAS_VALUE = handling.DAS_VALUE;
    }
}

init();
