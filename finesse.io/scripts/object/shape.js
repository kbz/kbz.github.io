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

class Shape{
    x;
    y;
    matrix;
    orientation;
    constructor(x,y,matrix, ord, orientation, moves)
    {
        this.x = 0;
        this.y = 0;
        this.matrix = new Array(matrix.length);
        for (var i = 0; i < matrix.length; i++)
        {
            this.matrix[i] = new Array(matrix[i].length);
            for( var j = 0; j < matrix[i].length; j++)
            {
                this.matrix[i][j] = matrix[i][j];
            }
        }
        this.ordinal = ord;
        this.orientation = orientation;
        this.moves = moves;
    };
    
    rotate(clockwise)
    {
        if (clockwise === 1)
        {
            this.orientation += 1;
            this.orientation = this.orientation % 4;
        }
        else 
        {
            this.orientation -= 1;
            if (this.orientation < 0)
            {
                this.orientation = 3;
            }
        }
    }
    
    getMoves(column)
    {
        var rot = this.orientation;
        if (this.moves.length === 1)
            rot = 0;
        else if (this.moves.length === 2)
        {
            rot = rot % 2;
        }
        var offset = this.computeOffset();
        // columns are numbered from 1-10 (0, 11 are borders)
        return this.moves[rot][column + offset - 1];
    }
    computeOffset(){
        var offset;
        for (var x = 0; x < this.matrix[0].length; x++)
        {
            offset = x;
            for (var y = 0; y < this.matrix.length; y++)
            {
                if (this.matrix[y][offset] !== 0)
                {
                    return offset;
                }
                
            }
        }
        return 0;
    }
}
