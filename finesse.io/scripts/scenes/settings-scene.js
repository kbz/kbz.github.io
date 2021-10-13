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

class SettingsScene extends Scene{
    
    bindsBox = {
        x: 100, y: 25, h: 325, w: 440
    };
    
    keyboardBindsBox = {
        x: 340, y: 25, h: 325, w: 100
    };
    
    leftKeyBindBox = {
        x: 340, y: 50, h: 30, w:200
    }; 
    rightKeyBindBox = {
        x: 340, y: 80, h: 30, w:200
    }; 
    softDropKeyBindBox = {
        x: 340, y: 110, h: 30, w:200
    }; 
    hardDropKeyBindBox = {
        x: 340, y: 140, h: 30, w:200
    }; 
    clockwiseKeyBindBox = {
        x: 340, y: 170, h: 30, w:200
    }; 
    counterclockwiseKeyBindBox = {
        x: 340, y: 200, h: 30, w:200
    }; 
    rotate180KeyBindBox = {
        x: 340, y: 230, h: 30, w:200
    }; 
    
    holdKeyBindBox = {
        x: 340, y: 260, h: 30, w:200
    };
    gameModeKeyBindBox = {
        x: 340, y: 290, h: 30, w:200
    }; 
    newGameKeyBindBox = {
        x: 340, y: 320, h: 30, w:200
    }; 
    
    controllerBindsBox  = {
        x: 440, y: 25, h: 325, w: 100
    };
    
    settingsBox = {
        x: 100, y: 375, h: 180, w: 440
    };
    
    dasSettingBox = {
        x: 340, y: 375, w: 200, h:30
    };
    arrSettingBox = {
        x: 340, y: 405, w: 200, h:30
    };
    sdrSettingBox = {
        x: 340, y: 435, w: 200, h:30
    };
    
    masterModeSettingsBox = {
        x: 340, y: 465, w: 200, h:30
   };
    
    retryOnFinesseSettingsBox = {
        x: 340, y: 495, w: 200, h:30
   };
    showGhostSettingsBox = {
        x: 340, y: 525, w: 200, h:30
   };
   
    returnButtonBox = {
        x: 320-100, y: 550, h: 50, w: 100
    };
    
   exportSettingsBox = {
        x: 320 + 25, y: 550, h: 50, w: 100
   };
    
    constructor()
    {
        super();
    }
    binding = false;
    bindingKey = "";
    bindingKeyboard = true;
    
    draw()
    {
        g.clearRect(0, 0, canvas.width, canvas.height);
        
        fillRect(outerRect, bgColor);
        drawRect(outerRect, gridBorderColor);
        fillRect(this.returnButtonBox, "#AAAAAA");
        drawRect(this.returnButtonBox, gridBorderColor);
        fillRect(this.exportSettingsBox, "#AAAAAA");
        drawRect(this.exportSettingsBox, gridBorderColor);
        
        fillRect(this.bindsBox, "#DDDDDD");
        drawRect(this.bindsBox, gridBorderColor);
        
        fillRect(this.settingsBox, "#DDDDDD");
        drawRect(this.settingsBox, gridBorderColor);
        // inner 
        
        var pAlpha = g.globalAlpha;
        g.globalAlpha = 0.2;
        // bindings
        fillRect(this.leftKeyBindBox, "#00AA00");
        fillRect(this.rightKeyBindBox, "#004400");
        fillRect(this.softDropKeyBindBox, "#00AA00");
        fillRect(this.hardDropKeyBindBox, "#004400");
        fillRect(this.clockwiseKeyBindBox, "#00AA00");
        fillRect(this.counterclockwiseKeyBindBox, "#004400");
        fillRect(this.rotate180KeyBindBox, "#00AA00");
        fillRect(this.holdKeyBindBox, "#004400");
        fillRect(this.gameModeKeyBindBox, "#00AA00");
        fillRect(this.newGameKeyBindBox, "#004400");
        
        // game settings
        fillRect(this.dasSettingBox, "#004400");
        fillRect(this.arrSettingBox, "#00AA00");
        fillRect(this.sdrSettingBox, "#004400");
        fillRect(this.masterModeSettingsBox, "#00AA00");
        fillRect(this.retryOnFinesseSettingsBox, "#004400");
        fillRect(this.showGhostSettingsBox, "#00AA00");
        
        // misc settings
        
        g.globalAlpha = pAlpha;
        
        g.lineWidth = 1;
        
        drawRect(this.bindsBox, gridBorderColor);
        drawRect(this.keyboardBindsBox, gridBorderColor);
        drawRect(this.controllerBindsBox, gridBorderColor);
        
        
        g.fillStyle = textColor;
        g.font = smallFont;
        g.fillText("Return", this.returnButtonBox.x + 20, this.returnButtonBox.y + 30); 
        g.fillText("Export", this.exportSettingsBox.x + 20, this.exportSettingsBox.y + 30);

        
        var bindOffset =20;
        g.fillText("Keyboard", this.keyboardBindsBox.x, this.keyboardBindsBox.y + 20);
        g.fillText("Controller", this.controllerBindsBox.x, this.controllerBindsBox.y + 20);
        g.fillText("LEFT", this.bindsBox.x + bindOffset, this.leftKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_LEFT), this.keyboardBindsBox.x , this.leftKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_LEFT), this.controllerBindsBox.x+ 25 , this.leftKeyBindBox.y + 20);
        g.fillText("RIGHT", this.bindsBox.x + bindOffset, this.rightKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_RIGHT), this.keyboardBindsBox.x , this.rightKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_RIGHT), this.controllerBindsBox.x+ 25 , this.rightKeyBindBox.y + 20);
        g.fillText("SOFT DROP", this.bindsBox.x + bindOffset, this.softDropKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_DOWN), this.keyboardBindsBox.x , this.softDropKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_DOWN), this.controllerBindsBox.x + 25, this.softDropKeyBindBox.y + 20);
        g.fillText("HARD DROP", this.bindsBox.x + bindOffset, this.hardDropKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_DROP), this.keyboardBindsBox.x , this.hardDropKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_DROP), this.controllerBindsBox.x + 25, this.hardDropKeyBindBox.y + 20);
        g.fillText("CLOCKWISE", this.bindsBox.x + bindOffset, this.clockwiseKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_CLOCK), this.keyboardBindsBox.x , this.clockwiseKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_CLOCK), this.controllerBindsBox.x + 25, this.clockwiseKeyBindBox.y + 20);
        g.fillText("COUNTERCLOCKWISE", this.bindsBox.x + bindOffset, this.counterclockwiseKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_COUNTERCLOCK), this.keyboardBindsBox.x , this.counterclockwiseKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_COUNTERCLOCK), this.controllerBindsBox.x + 25, this.counterclockwiseKeyBindBox.y + 20);
        g.fillText("ROTATE 180", this.bindsBox.x + bindOffset, this.rotate180KeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_180), this.keyboardBindsBox.x , this.rotate180KeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_180), this.controllerBindsBox.x + 25, this.rotate180KeyBindBox.y + 20);
        g.fillText("HOLD", this.bindsBox.x + bindOffset, this.holdKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_HOLD), this.keyboardBindsBox.x , this.holdKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_HOLD), this.controllerBindsBox.x + 25, this.holdKeyBindBox.y + 20);
        g.fillText("GAME MODE", this.bindsBox.x + bindOffset, this.gameModeKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_MODE), this.keyboardBindsBox.x , this.gameModeKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_MODE), this.controllerBindsBox.x + 25, this.gameModeKeyBindBox.y + 20);
        g.fillText("RESET/NEW GAME", this.bindsBox.x + bindOffset, this.newGameKeyBindBox.y + 20);
        g.fillText(getKeyboardInputForCode(KEY_RESET), this.keyboardBindsBox.x , this.newGameKeyBindBox.y + 20);
        g.fillText(getControllerInputForCode(KEY_RESET), this.controllerBindsBox.x + 25, this.newGameKeyBindBox.y + 20);
        
        // settings
        g.fillText("DAS:", this.settingsBox.x + bindOffset, this.dasSettingBox.y + 20);
        g.fillText(DAS_VALUE + (DAS_VALUE === 1 ? " Frame": " Frames"), this.settingsBox.x + bindOffset + 80, this.dasSettingBox.y + 20);
        g.fillText("+", this.dasSettingBox.x + bindOffset + 25, this.dasSettingBox.y + 20);
        g.fillText("-", this.dasSettingBox.x + 125 + bindOffset, this.dasSettingBox.y + 20);
        
        g.fillText("ARR:", this.settingsBox.x + bindOffset, this.arrSettingBox.y + 20);
        g.fillText((ARR_VALUE === -1 ? "Immediate(-1)" : ARR_VALUE === 1 ? ARR_VALUE + " Frame": ARR_VALUE + " Frames"), this.settingsBox.x + bindOffset + 80, this.arrSettingBox.y + 20);
        g.fillText("+", this.arrSettingBox.x + bindOffset + 25, this.arrSettingBox.y + 20);
        g.fillText("-", this.arrSettingBox.x + 125 + bindOffset, this.arrSettingBox.y + 20);
        
        g.fillText("SDR:", this.settingsBox.x + bindOffset, this.sdrSettingBox.y + 20);
        g.fillText((SDR_VALUE === -1 ? "Immediate(-1)" : SDR_VALUE === 1 ? SDR_VALUE + " Frame": SDR_VALUE +" Frames"), this.settingsBox.x + bindOffset + 80, this.sdrSettingBox.y + 20);
        g.fillText("+", this.dasSettingBox.x + bindOffset + 25, this.sdrSettingBox.y + 20);
        g.fillText("-", this.dasSettingBox.x + 125 + bindOffset, this.sdrSettingBox.y + 20);
        
        g.fillText("Master Mode:", this.settingsBox.x + bindOffset, this.masterModeSettingsBox.y + 20);
        g.fillText( showBoard ? "off" : "on" ,this.settingsBox.x + bindOffset + 175, this.masterModeSettingsBox.y + 20);
        g.fillText("toggle", this.masterModeSettingsBox.x + bindOffset + 50, this.masterModeSettingsBox.y + 20);
        
        g.fillText("Retry on fault:", this.settingsBox.x + bindOffset, this.retryOnFinesseSettingsBox.y + 20);
        g.fillText(retryOnFinesseFault ? "on": "off", this.settingsBox.x + bindOffset + 175, this.retryOnFinesseSettingsBox.y + 20);
        g.fillText("toggle", this.retryOnFinesseSettingsBox.x + bindOffset + 50, this.retryOnFinesseSettingsBox.y + 20);
       
        g.fillText("Show Ghost:", this.settingsBox.x + bindOffset, this.showGhostSettingsBox.y + 20);
        g.fillText(showGhost ? "on": "off", this.settingsBox.x + bindOffset + 175, this.showGhostSettingsBox.y + 20);
        g.fillText("toggle", this.showGhostSettingsBox.x + bindOffset + 50, this.showGhostSettingsBox.y + 20);
        g.fillText("Note: To import settings, drag and drop the settings file", 20, canvas.height-20);
        g.fillText("onto this page.", 20, canvas.height - 5);
       
        if (this.binding)
        {
            if (this.bindingKeyboard)
            {
                var prevAlpha = g.globalAlpha;
                g.globalAlpha = 0.7;
                fillRect(outerRect, "#FFFFFF");
                g.globalAlpha = prevAlpha;
                g.fillStyle = textColor;
                g.font = smallFont;
                g.fillText("Binding: " + this.bindingKey, canvas.width/2 - 100, canvas.height/2 - 25);
                g.fillText("Waiting for keyboard input... " , canvas.width/2 - 100, canvas.height/2 );
                g.fillText("Click anywhere to cancel" , canvas.width/2 - 100, canvas.height/2 + 25 );
            }
            if (!this.bindingKeyboard)
            {
                var prevAlpha = g.globalAlpha;
                g.globalAlpha = 0.7;
                fillRect(outerRect, "#FFFFFF");
                g.globalAlpha = prevAlpha;
                g.fillStyle = textColor;
                g.font = smallFont;
                g.fillText("Binding: " + this.bindingKey, canvas.width/2 - 100, canvas.height/2 - 25);
                g.fillText("Waiting for controller input... " , canvas.width/2 - 100, canvas.height/2 );
                g.fillText("Click anywhere to cancel" , canvas.width/2 - 100, canvas.height/2 + 25 );
            }
        }
    }
    
    onClick(event)
    {
        var offX = event.offsetX;
        var offY = event.offsetY;
        var box = this.returnButtonBox;
        if (isWithinBoundingBox(offX, offY, box))
        {
            loadGameScene();
            return;
        }
        if (this.binding)
        {
           this.binding = false;
           return;
        }
        if (isWithinBoundingBox(offX, offY, this.leftKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_LEFT;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.rightKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_RIGHT;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.softDropKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_DOWN;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.hardDropKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_DROP;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.clockwiseKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_CLOCK;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.counterclockwiseKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_COUNTERCLOCK;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }   
        if (isWithinBoundingBox(offX, offY, this.rotate180KeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_180;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.holdKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_HOLD;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.gameModeKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_MODE;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        if (isWithinBoundingBox(offX, offY, this.newGameKeyBindBox))
        {
           this.binding = true;
           this.bindingKey = KEY_RESET;
           if (offX > this.controllerBindsBox.x)
               this.bindingKeyboard = false;
           else
               this.bindingKeyboard = true;
        }  
        
        
        if (isWithinBoundingBox(offX, offY, this.dasSettingBox))
        {
           if (offX > this.controllerBindsBox.x)
           {
               DAS_VALUE--;
               if (DAS_VALUE < 0)
               {
                   DAS_VALUE = 0;
               }
           }
           else
           {
               DAS_VALUE++;
           }
        }  
        if (isWithinBoundingBox(offX, offY, this.arrSettingBox))
        {
           if (offX > this.controllerBindsBox.x)
           {
               ARR_VALUE--;
               if (ARR_VALUE < -1)
               {
                   ARR_VALUE = -1;
               }
           }
           else
           {
               ARR_VALUE++;
           }
        }  
        if (isWithinBoundingBox(offX, offY, this.sdrSettingBox))
        {
           if (offX > this.controllerBindsBox.x)
           {
               SDR_VALUE--;
               if (SDR_VALUE < -1)
               {
                   SDR_VALUE = -1;
               }
           }
           else
           {
               SDR_VALUE++;
           }
        }  
        if (isWithinBoundingBox(offX, offY, this.masterModeSettingsBox))
        {
            showBoard = !showBoard;
        }  
        if (isWithinBoundingBox(offX, offY, this.retryOnFinesseSettingsBox))
        {
            retryOnFinesseFault = !retryOnFinesseFault;
        }  
        if (isWithinBoundingBox(offX, offY, this.showGhostSettingsBox))
        {
            showGhost = !showGhost;
        }   
        if (isWithinBoundingBox(offX, offY, this.exportSettingsBox))
        {
            exportSettings();
        }  
    }
    
    update(time){
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
                    this.readControllerInput(b, gp.buttons[b].pressed, previousButtonStates[b]);
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
            this.readKeyboardInput(key, keyStateArray[key], keyPreviousStateArray[key]);
            keyPreviousStateArray[key] = keyStateArray[key];
        }
    }
    
    readControllerInput(key, current, prev){
        if (this.binding)
        {
            if ( !this.bindingKeyboard)
            {
                if (!prev && current)
                {
                    var id = getControllerInputForCode(this.bindingKey);
                    controllerBindings = controllerBindings.filter( (p) => p[0] !== id);
                    controllerBindings.push([key, this.bindingKey]);
                    this.binding = false;
                }
            }
        }
    }
    readKeyboardInput(key, current, prev){
        if (this.binding)
        {
            if (this.bindingKeyboard)
            {
                if (!prev && current)
                {
                    var id = getKeyboardInputForCode(this.bindingKey);
                    keyboardBindings = keyboardBindings.filter( (p) => p[0] !== id);
                    keyboardBindings.push([key, this.bindingKey]);
                    this.binding = false;
                }
            }
        }
    }
    
    onKeyUp()
    {
            var code = event.code.toString().toLowerCase();
            keyStateArray[code] = false;
    }
    onKeyDown()
    {
        event.preventDefault();
            var code = event.code.toString().toLowerCase();
            keyStateArray[code] = true;
            if (code !== "f12" && code !== "f5")
            {
                event.preventDefault();
            }
    }
}
