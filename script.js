ROWS = 20;
COLS = 10;
BLACK = 0;
TICK_INTERVAL = 300;
STATE = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    PAUSED: 2,
    OVER: 3
};

function randN(n) {
    return Math.floor(Math.random() * n);
}
function randBool() {
    return randN(2) == 0;
}

lineCountEl = document.getElementById("lineCount");
statusEl = document.getElementById("status");
lineCount = 0;
activePiece = null;
gameState = STATE.NOT_STARTED;
interval = null;
boardEl = document.getElementById("board");
board = [];
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
            content += '<div class="cell cell-' + (gameState == STATE.PAUSED ? 0 : getCellColor(r, c)) + '"></div>';
        }
        content += "</div>";
    }
    if (gameState == STATE.PAUSED) {
        statusEl.innerHTML = "Paused";
    } else {
        statusEl.innerHTML = "";
    }
    boardEl.innerHTML = content;
    lineCountEl.innerHTML = lineCount == 1 ? "1 line" : (lineCount + " lines");
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
            statusEl.innerHTML = "Game Over!";
            clearInterval(interval);
            interval = null;
            gameState = STATE.OVER;
            return;
        }
    } else  if (activePiece.canMove(1, 0)) {
        activePiece.move(1, 0); // move
    } else {
        activePiece.lock();
        activePiece = null;
        processLines();
    }
    paint();
}

document.addEventListener('keydown', function(event) {
    if (gameState == STATE.PAUSED) {
        switch (event.code) {
            case 'KeyP':
                interval = setInterval(tick, TICK_INTERVAL);
                gameState = STATE.IN_PROGRESS;
                paint();
                break;
        }
    } else if (gameState == STATE.IN_PROGRESS) {
        switch (event.code) {
            case 'ArrowUp':
                if (activePiece && activePiece.canRotate(1)) {
                    activePiece.rotate(1);
                    paint();
                }
                break;
            case 'ArrowDown':
                if (activePiece) {
                    while (activePiece.canMove(1, 0)) {
                        activePiece.move(1, 0);
                    }
                    activePiece.lock();
                    activePiece = null;
                    processLines();
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
            case 'KeyP':
                clearInterval(interval);
                interval = null;
                gameState = STATE.PAUSED;
                paint();
                break;
        }
    }
});
interval = setInterval(tick, TICK_INTERVAL);
gameState = STATE.IN_PROGRESS;
tick();
