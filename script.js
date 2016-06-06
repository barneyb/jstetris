ROWS = 20;
COLS = 10;
BLACK = 0;
boardEl = document.getElementById("board");
board = [];
pieces = [
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
activeColor = BLACK;
activeRotation = 0;
interval = null;
for (var r = 0; r < ROWS; r++) {
    board[r] = [];
    for (var c = 0; c < COLS; c++) {
        board[r][c] = BLACK;
    }
}
function getCellColor(r, c) {
    if (activePiece != null) {
        for (var i = 0; i < activePiece.length; i += 2) {
            if (activePiece[i] == r && activePiece[i + 1] == c) {
                return activeColor;
            }
        }
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
function lock(piece, color) {
    for (var i = 0; i < piece.length; i += 2) {
        board[piece[i]][piece[i + 1]] = color;
    }
}
function move(piece, dr, dc) {
    for (var i = 0; i < piece.length; i++) {
        piece[i] += i % 2 ? dc : dr;
    }
}
function canMove(piece, dr, dc) {
    for (var i = 0; i < piece.length; i += 2) {
        var r = piece[i] + dr,
            c = piece[i + 1] + dc;
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
        var activeIndex = randN(pieces.length);
        activePiece = pieces[activeIndex].slice();
        activeColor = activeIndex + 1;
        activeRotation = randN(4);
        move(activePiece, 0, 3);
        if (! canMove(activePiece, 0, 0)) {
            boardEl.innerHTML = '<h2>Game Over!</h2>' + boardEl.innerHTML;
            clearInterval(interval);
            return;
        }
    } else {
        if (canMove(activePiece, 1, 0)) {
            move(activePiece, 1, 0); // move
        } else {
            lock(activePiece, activeColor);
            activePiece = null;
            processLines();
        }
    }
    paint();
}
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            console.log("left?");
            if (activePiece && canMove(activePiece, 0, -1)) {
                console.log("left");
                move(activePiece, 0, -1)
            }
            break;
        case 'ArrowRight':
            console.log("right?");
            if (activePiece && canMove(activePiece, 0, 1)) {
                console.log("right");
                move(activePiece, 0, 1)
            }
            break;
        default:
            console && console.log && console.log(event.code, "is ignored");
    }
});
interval = setInterval(tick, 200);
tick();
