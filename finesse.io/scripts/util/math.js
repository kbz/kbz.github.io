/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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