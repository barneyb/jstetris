ROWS = 20;
COLS = 10;
BLACK = 0;
boardEl = document.getElementById("board");
board = [];
lineCountEl = document.getElementById("lineCount");
lineCount = 0;
__NEXT_RAND = 1;
function randN(n) {
    return __NEXT_RAND++ % n;
    //return Math.floor(Math.random() * n);
}
function randBool() {
    return randN(2) == 0;
}
function Piece(color, layoutTemplates) {
    this.color = color;
    this.layouts = [];
    for (var i = 0; i < layoutTemplates.length; i++) {
        this.layouts[i] = layoutTemplates[i].slice(0)
    }
    this.rotation = randN(this.layouts.length);
    this.layout = this.layouts[this.rotation];
}
Piece.prototype.centerAndRaise = function centerAndRaise() {
    var minRow = ROWS, minCol = COLS, maxCol = 0;
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        minRow = Math.min(minRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
    }
    var dr = -minRow;
    var dc = (COLS - (maxCol - minCol + 1)) / 2 - minCol;
    if (randBool()) {
        dc = Math.floor(dc);
    } else {
        dc = Math.ceil(dc);
    }
    this.move(dr, dc);
};
Piece.prototype.rotate = function rotate(dr) {
    this.rotation += dr;
    this.rotation %= this.layouts.length;
    this.layout = this.layouts[this.rotation];
};
Piece.prototype.canRotate = function canRotate(dr) {
    var rot = this.rotation + dr;
    rot %= this.layouts.length;
    var layout = this.layouts[rot];
    for (var i = 0; i < layout.length; i += 2) {
        var r = layout[i],
            c = layout[i + 1];
        if (c < 0 || c >= COLS) {
            return false;
        }
        if (r < 0) {
            continue; // allow rotating off the top of the board
        }
        if (r >= ROWS) {
            return false;
        }
        if (board[r][c] != BLACK) {
            return false;
        }
    }
    return true;
};
Piece.prototype.move = function move(dr, dc) {
    for (var i = 0; i < this.layouts.length; i++) {
        var layout = this.layouts[i];
        for (var j = 0; j < layout.length; j++) {
            layout[j] += j % 2 ? dc : dr
        }
    }
};
Piece.prototype.canMove = function canMove(dr, dc) {
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i] + dr,
            c = this.layout[i + 1] + dc;
        if (c < 0 || c >= COLS) {
            return false;
        }
        if (r < 0) {
            continue; // allow rotating off the top of the board
        }
        if (r >= ROWS) {
            return false;
        }
        if (board[r][c] != BLACK) {
            return false;
        }
    }
    return true;
};
Piece.prototype.isAt = function isAt(r, c) {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i] == r && this.layout[i + 1] == c) {
            return true;
        }
    }
    return false;
};
Piece.prototype.lock = function lock() {
    for (var i = 0; i < this.layout.length; i += 2) {
        board[this.layout[i]][this.layout[i + 1]] = this.color;
    }
};
pieceLayoutTemplates = [
    // cyan I
    // - - - -   - - x -   - - - -   - x - -
    // x x x x   - - x -   - - - -   - x - -
    // - - - -   - - x -   x x x x   - x - -
    // - - - -   - - x -   - - - -   - x - -
    [
        [1,0, 1,1, 1,2, 1,3],
        [0,2, 1,2, 2,2, 3,2],
        [2,0, 2,1, 2,2, 2,3],
        [0,1, 1,1, 2,1, 3,1]
    ],
    // blue J
    // - - - -   - - x -   - - - -   - - - -
    // x x x -   - - x -   - x - -   - x x -
    // - - x -   - x x -   - x x x   - x - -
    // - - - -   - - - -   - - - -   - x - -
    [
        [1,0, 1,1, 1,2, 2,2],
        [0,2, 1,2, 2,2, 2,1],
        [1,1, 2,1, 2,2, 2,3],
        [1,1, 1,2, 2,1, 3,1]
    ],
    // orange L
    // - - - -   - x - -   - - - -   - - - -
    // - - x -   - x - -   - x x x   - x x -
    // x x x -   - x x -   - x - -   - - x -
    // - - - -   - - - -   - - - -   - - x -
    [
        [2,0, 2,1, 2,2, 1,2],
        [0,1, 1,1, 2,1, 2,2],
        [1,1, 2,1, 1,2, 1,3],
        [1,1, 1,2, 2,2, 3,2]
    ],
    // yellow O
    // x x - -   x x - -   x x - -   x x - -
    // x x - -   x x - -   x x - -   x x - -
    // - - - -   - - - -   - - - -   - - - -
    // - - - -   - - - -   - - - -   - - - -
    [
        [0,0, 1,0, 1,1, 0,1],
        [0,0, 1,0, 1,1, 0,1],
        [0,0, 1,0, 1,1, 0,1],
        [0,0, 1,0, 1,1, 0,1]
    ],
    // lime S
    // - x x -   - x - -   - x x -   - x - -
    // x x - -   - x x -   x x - -   - x x -
    // - - - -   - - x -   - - - -   - - x -
    // - - - -   - - - -   - - - -   - - - -
    [
        [1,0, 1,1, 0,1, 0,2],
        [0,1, 1,1, 1,2, 2,2],
        [1,0, 1,1, 0,1, 0,2],
        [0,1, 1,1, 1,2, 2,2]
    ],
    // purple T
    // - - - -   - x - -   - x - -   - x - -
    // x x x -   x x - -   x x x -   - x x -
    // - x - -   - x - -   - - - -   - x - -
    // - - - -   - - - -   - - - -   - - - -
    [
        [1,0, 1,1, 2,1, 1,2],
        [1,0, 0,1, 1,1, 2,1],
        [1,0, 0,1, 1,1, 1,2],
        [0,1, 1,1, 1,2, 2,1]
    ],
    // red Z
    // x x - -   - - x -   x x - -   - - x -
    // - x x -   - x x -   - x x -   - x x -
    // - - - -   - x - -   - - - -   - x - -
    // - - - -   - - - -   - - - -   - - - -
    [
        [0,0, 0,1, 1,1, 1,2],
        [0,2, 1,1, 1,2, 2,1],
        [0,0, 0,1, 1,1, 1,2],
        [0,2, 1,1, 1,2, 2,1]
    ]
];
activePiece = null;
interval = null;
for (var r = 0; r < ROWS; r++) {
    board[r] = [];
    for (var c = 0; c < COLS; c++) {
        board[r][c] = BLACK;
    }
}
function getCellColor(r, c) {
    if (activePiece != null && activePiece.isAt(r, c)) {
        return activePiece.color;
    }
    return board[r][c];
}
function paint() {
    var content = "";
    for (var r = 0; r < ROWS; r++) {
        content += '<div class="row">';
        for (var c = 0; c < COLS; c++) {
            content += '<div class="cell cell-' + getCellColor(r, c) + '"></div>';
        }
        content += "</div>";
    }
    boardEl.innerHTML = content;
    lineCountEl.innerHTML = lineCount + " line(s)";
}
function processLines() {
    rowLoop:
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            if (board[r][c] == BLACK) {
                continue rowLoop;
            }
        }
        lineCount += 1;
        for (var rr = r; rr > 0; rr--) {
            for (var cc = 0; cc < COLS; cc++) {
                board[rr][cc] = board[rr - 1][cc];
            }
        }
        for (var cz = 0; cz < COLS; cz++) {
            board[0][cz] = BLACK;
        }
    }
}
function tick() {
    if (activePiece == null) {
        var activeIndex = randN(pieceLayoutTemplates.length);
        activePiece = new Piece(activeIndex + 1, pieceLayoutTemplates[activeIndex]);
        activePiece.centerAndRaise();
        if (! activePiece.canMove(0, 0)) {
            boardEl.innerHTML = '<h2>Game Over!</h2>' + boardEl.innerHTML;
            clearInterval(interval);
            return;
        }
    } else {
        if (activePiece.canMove(1, 0)) {
            activePiece.move(1, 0); // move
        } else {
            activePiece.lock();
            activePiece = null;
            processLines();
        }
    }
    paint();
}
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowUp':
            if (activePiece && activePiece.canRotate(1)) {
                activePiece.rotate(1);
                paint();
            }
            break;
        case 'ArrowLeft':
            if (activePiece && activePiece.canMove(0, -1)) {
                activePiece.move(0, -1);
                paint();
            }
            break;
        case 'ArrowRight':
            if (activePiece && activePiece.canMove(0, 1)) {
                activePiece.move(0, 1);
                paint();
            }
            break;
        //default:
        //    console && console.log && console.log(event.code, "is ignored");
    }
});
interval = setInterval(tick, 500);
tick();
