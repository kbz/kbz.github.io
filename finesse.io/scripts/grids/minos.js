/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 // (spawn position)
const minos = [
    // Z mino
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    // S mino
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    // I mino
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    // T mino
    [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    // O mino
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    // L mino
    [
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ],
    // J mino
    [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ]
];


getOffsets = function(index, srcOrientation, dstOrientation)
{
        //console.log(index + " " + srcOrientation + " " + dstOrientation);
    if (index === 4)
        return [[0,0]];
    else
    {
        switch(index){
            case 0:
            case 1:
            case 3:
            case 5:
            case 6:
                // 0 -> R
                if (srcOrientation === 0 && dstOrientation === 1)
                    return [
                        [0  ,0],
                        [-1 ,0],
                        [-1 ,-1],
                        [0  ,+2],
                        [-1 ,+2]
                    ];
                // R -> 0
                else if (srcOrientation === 1 && dstOrientation === 0)
                    return [
                        [0  ,0],
                        [+1 ,0],
                        [+1 ,+1],
                        [0  ,-2],
                        [1  ,-2]
                    ];
                // R -> 2
                else if (srcOrientation === 1 && dstOrientation === 2)
                    return [
                        [0  ,0],
                        [+1 ,0],
                        [+1 ,+1],
                        [0  ,-2],
                        [+1 ,-2]
                    ];
                // 2 -> R
                else if (srcOrientation === 2 && dstOrientation === 1)
                    return [
                        [0  ,0],
                        [-1 ,0],
                        [-1 ,-1],
                        [0  ,+2],
                        [-1 ,+2]
                    ];
                // 2 -> L
                else if (srcOrientation === 2 && dstOrientation === 3)
                       return [
                           [0  ,0],
                           [+1 ,0],
                           [+1 ,-1],
                           [0  ,+2],
                           [+1 ,+2]
                       ];
                // L -> 2
                else if (srcOrientation === 3 && dstOrientation === 2)
                       return [
                           [0  ,0],
                           [-1 ,0],
                           [-1 ,+1],
                           [0  ,-2],
                           [-1 ,-2]
                       ];
                   // L -> 0
                else if ( srcOrientation === 3 && dstOrientation === 0)
                       return [
                           [0  ,0],
                           [-1 ,0],
                           [-1 ,+1],
                           [0  ,-2],
                           [-1 ,-2]
                       ];
                   // 0 -> L
                else if ( srcOrientation === 0 && dstOrientation === 3)
                       return [
                           [0  ,0],
                           [+1 ,0],
                           [+1 ,-1],
                           [0  ,+2],
                           [+1 ,+2]
                       ];
                break;
            case 2:
                // 0 -> R
                if (srcOrientation === 0 && dstOrientation === 1)
                    return [
                        [0  ,0],
                        [-2 ,0],
                        [+1 ,0],
                        [-2 ,+1],
                        [+1 ,-2]
                    ];
                // R -> 0
                else if (srcOrientation === 1 && dstOrientation === 0)
                    return [
                        [0,  0],
                        [+2, 0],
                        [-1, 0],
                        [+2, -1],
                        [-1, +2]
                    ];
                // R -> 2
                else if (srcOrientation === 1 && dstOrientation === 2)
                    return [
                        [0,  0],
                        [-1, 0],
                        [+2, 0],
                        [-1, -2],
                        [+2, +1]
                    ];
                // 2 -> R
                else if (srcOrientation === 2 && dstOrientation === 1)
                       return [
                           [0,  0],
                           [+1, 0],
                           [-2, 0],
                           [+1, +2],
                           [-2, -1]
                       ];
                // 2 -> L
                else if (srcOrientation === 2 && dstOrientation === 3)
                       return [
                           [0,  0],
                           [+2, 0],
                           [-1, 0],
                           [+2, -1],
                           [-1, +2]
                       ];
                // L -> 2
                else if (srcOrientation === 3 && dstOrientation === 2)
                       return [
                           [0,  0],
                           [-2, 0],
                           [+1, 0],
                           [-2, +1],
                           [+1, -2]
                       ];
                // L -> 0
                else if ( srcOrientation === 3 && dstOrientation === 0)
                       return [
                           [0,  0],
                           [+1, 0],
                           [-2, 0],
                           [+1, +2],
                           [-2, -1]
                       ];
                // 0 -> L
                else if ( srcOrientation === 0 && dstOrientation === 3)
                       return [
                           [0,  0],
                           [-1, 0],
                           [+2, 0],
                           [-1, -2],
                           [+2, +1]
                       ];
               break;
        }
    }
    return [0,0];
};