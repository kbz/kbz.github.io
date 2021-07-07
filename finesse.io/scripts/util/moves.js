/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const DAS_LEFT = "DL";
const DAS_RIGHT = "DR";
const SOFT_DROP = "SD";
const DROP = "DROP";
const LEFT = "L";
const RIGHT = "R";
const ROTATE_CLOCK = "C";
const ROTATE_COUNTER = "CC";
const MOVES = [
// Z-mino
    [
        // horizontal
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // vertical
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[ROTATE_COUNTER, LEFT, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, RIGHT, DROP]],
        [[ROTATE_CLOCK, RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, DROP]]
        ]
    ],
    // S-mino
    [
        // horizontal
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // vertical
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[ROTATE_COUNTER, LEFT, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, RIGHT, DROP]],
        [[ROTATE_CLOCK, RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, DROP]]
        ]
    ],
    // I-mino
    [
        // horizontal
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // vertical
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_COUNTER, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[LEFT, ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[RIGHT, ROTATE_CLOCK, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[DAS_RIGHT, ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, DROP]]
        ]
    ],
    // T-mino
    [
        // flat down
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // flat left
        [
        [[ROTATE_CLOCK, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, LEFT, LEFT, DROP]],
        [[ROTATE_CLOCK, LEFT, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, RIGHT, DROP]],
        [[ROTATE_CLOCK, RIGHT, RIGHT, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, ROTATE_CLOCK, DROP]]
        ],
        // flat top
        [
        [
            [DAS_LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ]
        ],
        // flat right
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, RIGHT, DROP]],
        [[ROTATE_COUNTER, RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, ROTATE_COUNTER, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, DAS_RIGHT, DROP]]
        ]
    ],
    // O-mino
    [
        [
        [[DAS_LEFT, DROP]],
        [[DAS_LEFT, RIGHT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ]
        
    ],
    // L-mino
    [
        // flat down
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // flat left
        [
        [[ROTATE_CLOCK, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, LEFT, LEFT, DROP]],
        [[ROTATE_CLOCK, LEFT, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, RIGHT, DROP]],
        [[ROTATE_CLOCK, RIGHT, RIGHT, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, ROTATE_CLOCK, DROP]]
        ],
        // flat top
        [
        [
            [DAS_LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ]
        ],
        // flat right
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, RIGHT, DROP]],
        [[ROTATE_COUNTER, RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, ROTATE_COUNTER, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, DAS_RIGHT, DROP]]
        ]
        
    ],
    // J-mino
    [
        // flat down
        [
        [[DAS_LEFT, DROP]],
        [[LEFT, LEFT, DROP]],
        [[LEFT, DROP]],
        [[DROP]],
        [[RIGHT, DROP]],
        [[RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, DROP]]
        ],
        // flat left
        [
        [[ROTATE_CLOCK, DAS_LEFT, DROP]],
        [[DAS_LEFT, ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, LEFT, LEFT, DROP]],
        [[ROTATE_CLOCK, LEFT, DROP]],
        [[ROTATE_CLOCK, DROP]],
        [[ROTATE_CLOCK, RIGHT, DROP]],
        [[ROTATE_CLOCK, RIGHT, RIGHT, DROP]],
        [[ROTATE_CLOCK, DAS_RIGHT, LEFT, DROP]],
        [[DAS_RIGHT, ROTATE_CLOCK, DROP]]
        ],
        // flat top
        [
        [
            [DAS_LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [RIGHT, RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [RIGHT, RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, LEFT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, LEFT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ],
        [
            [DAS_RIGHT, ROTATE_CLOCK, ROTATE_CLOCK, DROP],
            [DAS_RIGHT, ROTATE_COUNTER, ROTATE_COUNTER, DROP]
        ]
        ],
        // flat right
        [
        [[ROTATE_COUNTER, DAS_LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, LEFT, DROP]],
        [[ROTATE_COUNTER, LEFT, DROP]],
        [[ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, RIGHT, DROP]],
        [[ROTATE_COUNTER, RIGHT, RIGHT, DROP]],
        [[DAS_RIGHT, LEFT, ROTATE_COUNTER, DROP]],
        [[DAS_RIGHT, ROTATE_COUNTER, DROP]],
        [[ROTATE_COUNTER, DAS_RIGHT, DROP]]
        ]
    ]
];


compareMoves = function(src, target)
{
    if (!src || !target)
        return false;
    var moveList = target;
    var srcMoves = src;
    var matches = [];
    // if we used less steps than the finesse steps, then count it as correct
    // applies to cases where the player uses das preservation
    if (srcMoves.length < target[0].length)
    {
        return true;
    }
    for (var t = 0; t < target.length; t++)
    {
        var currentTarget = moveList[t];
        matches.push(eqSet(srcMoves, currentTarget));
    }
    for (var i = 0; i < matches.length; i++)
    {
        if (matches[i])
            return true;
    }
    return false;
};
function eqSet(as, bs) {
    return as.length === bs.length && all(isIn(bs), as);
}

function all(pred, as) {
    for (var a of as) if (!pred(a)) return false;
    return true;
}

function isIn(as) {
    return function (a) {
        return as.includes(a);
    };
}
