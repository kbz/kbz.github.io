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

// Function to rotate the matrix 90 degree clockwise 
function rotateClockwise(mino) 
{ 
  var n = mino.matrix.length;
//  printMatrix(mino.matrix);
    // Traverse each cycle 
    for (var i = 0; i < n / 2; i++) 
    { 
        for (var j = i; j < n - i - 1; j++) 
        { 
  
            // Swap elements of each cycle 
            // in clockwise direction 
            var temp = mino.matrix[i][j]; 
            mino.matrix[i][j] = mino.matrix[n - 1 - j][i]; 
            mino.matrix[n - 1 - j][i] = mino.matrix[n - 1 - i][n - 1 - j]; 
            mino.matrix[n - 1 - i][n - 1 - j] = mino.matrix[j][n - 1 - i]; 
            mino.matrix[j][n - 1 - i] = temp; 
        } 
    }
    mino.rotate(1);
//  printMatrix(mino.matrix);
} 

function printMatrix(matrix)
{
    var output = "";
    for (var y = 0; y < matrix.length; y++){
        
        for (var x = 0; x < matrix[y].length; x++) {
            output += " " + matrix[y][x];
        }
        console.log(output);
        output = "";
    }
}

// Function to rotate the matrix 90 degree counterclockwise 
function rotateCounterClockwise(mino) 
{ 
    rotateClockwise(mino);
    rotateClockwise(mino);
    rotateClockwise(mino);
} 
