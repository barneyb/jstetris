ROWS = 20;
COLS = 10;
BLACK = 0;
boardEl = document.getElementById("board");
board = [];
function Piece(color, layoutTemplate) {
    this.color = color;
    this.layout = layoutTemplate.slice(0);
}
Piece.prototype.move = function move(dr, dc) {
    for (var i = 0; i < this.layout.length; i++) {
        this.layout[i] += i % 2 ? dc : dr;
    }
};
Piece.prototype.canMove = function canMove(dr, dc) {
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i] + dr,
            c = this.layout[i + 1] + dc;
        if (c < 0 || c >= COLS) {
            return false;
        }
        if (r < 0 || r >= ROWS) {
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
Piece.prototype.lock = function lock(board) {
    for (var i = 0; i < this.layout.length; i += 2) {
        board[this.layout[i]][this.layout[i + 1]] = this.color;
    }
};
pieceLayoutTemplates = [
    // - - - -   - - x -   - - - -   - x - -
    // x x x x   - - x -   - - - -   - x - -
    // - - - -   - - x -   x x x x   - x - -
    // - - - -   - - x -   - - - -   - x - -
    [1,0, 1,1, 1,2, 1,3], // cyan I
    // - - - -   - - x -   - - - -   - - - -
    // x x x -   - - x -   - x - -   - x x -
    // - - x -   - x x -   - x x x   - x - -
    // - - - -   - - - -   - - - -   - x - -
    [1,0, 1,1, 1,2, 2,2], // blue J
    // - - - -   - x - -   - - - -   - - - -
    // - - x -   - x - -   - x x x   - x x -
    // x x x -   - x x -   - x - -   - - x -
    // - - - -   - - - -   - - - -   - - x -
    [2,0, 2,1, 2,2, 1,2], // orange L
    // x x - -   x x - -   x x - -   x x - -
    // x x - -   x x - -   x x - -   x x - -
    // - - - -   - - - -   - - - -   - - - -
    // - - - -   - - - -   - - - -   - - - -
    [0,0, 1,0, 1,1, 0,1], // yellow O
    // - x x -   - x - -   - x x -   - x - -
    // x x - -   - x x -   x x - -   - x x -
    // - - - -   - - x -   - - - -   - - x -
    // - - - -   - - - -   - - - -   - - - -
    [1,0, 1,1, 0,1, 0,2], // lime S
    // - - - -   - x - -   - x - -   - x - -
    // x x x -   x x - -   x x x -   - x x -
    // - x - -   - x - -   - - - -   - x - -
    // - - - -   - - - -   - - - -   - - - -
    [1,0, 1,1, 2,1, 1,2], // purple T
    // x x - -   - - x -   x x - -   - - x -
    // - x x -   - x x -   - x x -   - x x -
    // - - - -   - x - -   - - - -   - x - -
    // - - - -   - - - -   - - - -   - - - -
    [0,0, 0,1, 1,1, 1,2] // red Z
];
activePiece = null;
activeRotation = 0;
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
}
function processLines() {
    rowLoop:
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            if (board[r][c] == BLACK) {
                continue rowLoop;
            }
        }
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
__NEXT_RAND = 0;
function randN(n) {
    return __NEXT_RAND++ % n;
    //return Math.floor(Math.random() * n);
}
function tick() {
    if (activePiece == null) {
        var activeIndex = randN(pieceLayoutTemplates.length);
        activePiece = new Piece(activeIndex + 1, pieceLayoutTemplates[activeIndex]);
        activeRotation = randN(4);
        activePiece.move(0, 3);
        if (! activePiece.canMove(0, 0)) {
            boardEl.innerHTML = '<h2>Game Over!</h2>' + boardEl.innerHTML;
            clearInterval(interval);
            return;
        }
    } else {
        if (activePiece.canMove(1, 0)) {
            activePiece.move(1, 0); // move
        } else {
            activePiece.lock(board);
            activePiece = null;
            processLines();
        }
    }
    paint();
}
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            if (activePiece && activePiece.canMove(0, -1)) {
                activePiece.move(0, -1);
            }
            break;
        case 'ArrowRight':
            if (activePiece && activePiece.canMove(0, 1)) {
                activePiece.move(0, 1);
            }
            break;
        //default:
        //    console && console.log && console.log(event.code, "is ignored");
    }
});
interval = setInterval(tick, 100);
tick();
