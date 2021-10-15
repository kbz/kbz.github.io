/**
Copyright 2021 kb_z

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class GameScene extends Scene 
{
    constructor()
    {
        super();
    }
    onClick(event)
    {
        var offX = event.offsetX;
        var offY = event.offsetY;
        var settingsBox = settingsButton;
        if (isWithinBoundingBox(offX, offY, settingsBox))
        {
            loadSettingsScene();
            return;
        }
        var gridBox = gridRect;
        if (isWithinBoundingBox(offX, offY, gridBox))
        {
            startNewGame();
            scoreboard.wipe();
            moveList = [];
            return;
        }
    }
    
    onKeyDown(event)
    {
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
            if (code === "numpadsubtract")
            {
                showGhost = !showGhost;
                return;
            }
            if (code === "numpadadd")
            {
                showBoard = !showBoard;
                return;
            }
            if (code === "f2")
            {
                retryOnFinesseFault = !retryOnFinesseFault;
                return;
            }
            keyStateArray[code] = true;
        
    }
    
    onKeyUp()
    {
            var code = event.code.toString().toLowerCase();
            keyStateArray[code] = false;
    }
    draw(){
        
            g.clearRect(0, 0, canvas.width, canvas.height);
                    
            drawUI();
 
            if (scoreboard.isGameOver()) {
                drawStartScreen();
            } else {
                if (gameMode === 8)
                {
                    drawNext();
                }
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
    
    update(time)
    {
  // game mode 9: demo/auto mode this breaks if ARR is set to -1
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
                            this.keydown(KEY_RIGHT);
                            demoButtonPressed = true;
                        }
                        else 
                        {
                            if (isRightDas)
                            {
                                this.keyup(KEY_RIGHT);
                                demoButtonPressed = false;
                                currentMove++;
                                demoDelay = DEMO_DELAY;
                            }
                        }
                        break;
                    case RIGHT:
                        if (!demoButtonPressed)
                        {
                            this.keydown(KEY_RIGHT);
                            demoButtonPressed = true;
                        } else
                        {
                            this.keyup(KEY_RIGHT);
                            demoButtonPressed = false;
                            currentMove++;
                            demoDelay = DEMO_DELAY;
                        }
                        break;
                    case LEFT:
                        if (!demoButtonPressed)
                        {
                           this.keydown(KEY_LEFT);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            this.keyup(KEY_LEFT);
                            demoButtonPressed = false;
                            currentMove++;
                            demoDelay = DEMO_DELAY;
                        }
                        break;
                    case DAS_LEFT:
                        if (!demoButtonPressed)
                        {
                            this.keydown(KEY_LEFT);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            if (isLeftDas)
                            {
                               this.keyup(KEY_LEFT);
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
                            this.keydown(KEY_CLOCK);
                            demoButtonPressed = true;
                        }
                        else
                        {
                            this.keyup(KEY_CLOCK);
                            currentMove++;
                            demoButtonPressed = false;
                            demoDelay = DEMO_DELAY;
                        }
                    break;
                  case ROTATE_COUNTER:
                      if (!demoButtonPressed)
                      {
                          this.keydown(KEY_COUNTERCLOCK);
                          demoButtonPressed = true;
                      }
                      else
                      {
                          this.keyup(KEY_COUNTERCLOCK);
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
        
        if (scoreboard.isGameOver())
        {
            return;
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
                    this.readInput(b, gp.buttons[b].pressed, previousButtonStates[b]);
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
            this.readInput(key, keyStateArray[key], keyPreviousStateArray[key]);
            keyPreviousStateArray[key] = keyStateArray[key];
        }

        // process input actions
        for (const key of Object.keys(actionArray))
        {
            var prev = previousActionArray[key];
            var curr = actionArray[key];
            this.handleInput(key, prev, curr);
            previousActionArray[key] = actionArray[key];
        }
    }
    
    
    readInput(input, curr, prev)
    {
        var key = resolveBindings(input);
        if (prev === false && curr === true)
        {
            this.keydown(key);
        }
        else 
        if (prev === true && curr === false)
        {
            this.keyup(key);
        }
    }

    handleInput(code, prev, curr)
    {
        if (!prev && curr)
        {
            scoreboard.addKeyPress(1)
        }
        switch (code)
        {
            case KEY_MODE:
            {
                if (!prev && curr)
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
                }
            }
            break;
            
            case KEY_RESET:
            {
                if (!prev && curr)
                {
                   startNewGame();
                   scoreboard.wipe();
                   moveList = [];
                }
            }
            break;
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
                    scoreboard.newPiece();
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
            case KEY_180:
                if (curr && !prev)
                {
                    if (canRotate(fallingShape, rotate180))
                    {
                        rotate(fallingShape, rotate180);
                    }
                    moveList.push(ROTATE_CLOCK);
                    moveList.push(ROTATE_CLOCK);
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
                    if (fallingShape.ordinal === 4)
                    {
                        fallingShapeRow -= 1;
                    }
                    if (!canSpawn(fallingShape, fallingShapeRow, fallingShapeCol, grid))
                    {
                        scoreboard.setGameOver();
                        scoreboard.setTopscore();
                    }
                    moveList = [];
                }
                break;
            default:
                break;
        }
    }
    
    
    keydown(id)
    {
        actionArray[id] = true;
    }

    keyup(id)
    {
        actionArray[id] = false;
    }
}
