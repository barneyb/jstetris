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
