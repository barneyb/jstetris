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

function Model() {
    this.state = STATE.NOT_STARTED;
    this.lineCount = 0;
    this.activePiece = null;
    this.interval = null;
    this.board = [];
    this.initializeBoard();
}
Model.prototype.initializeBoard = function() {
    for (var r = 0; r < ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
};
Model.prototype.isPieceActive = function() {
    return this.activePiece != null;
};
Model.prototype.isCellEmpty = function(r, c) {
    return this.board[r][c] == BLACK;
};
Model.prototype.getCellColor = function(r, c) {
    if (this.state == STATE.PAUSED) {
        return BLACK;
    }
    if (this.activePiece != null && this.activePiece.isAt(r, c)) {
        return this.activePiece.color;
    }
    return this.board[r][c];
};
model = new Model();
ui = {
    lineCount: document.getElementById("lineCount"),
    status: document.getElementById("status"),
    board: document.getElementById("board")
};

function paint() {
    if (model.state == STATE.PAUSED) {
        ui.status.innerHTML = "Paused";
    } else if (model.state == STATE.OVER) {
        ui.status.innerHTML = "Game Over!";
    } else {
        ui.status.innerHTML = "";
    }
    ui.lineCount.innerHTML = model.lineCount == 1 ? "1 line" : (model.lineCount + " lines");
    var content = "";
    for (var r = 0; r < ROWS; r++) {
        content += '<div class="row">';
        for (var c = 0; c < COLS; c++) {
            content += '<div class="cell cell-' + model.getCellColor(r, c) + '"></div>';
        }
        content += "</div>";
    }
    ui.board.innerHTML = content;
}
function processLines() {
    rowLoop:
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            if (model.isCellEmpty(r, c)) {
                continue rowLoop;
            }
        }
        model.lineCount += 1;
        for (var rr = r; rr > 0; rr--) {
            for (var cc = 0; cc < COLS; cc++) {
                model.board[rr][cc] = model.board[rr - 1][cc];
            }
        }
        for (var cz = 0; cz < COLS; cz++) {
            model.board[0][cz] = BLACK;
        }
    }
}
function lockActivePiece() {
    model.activePiece.lock();
    model.activePiece = null;
    processLines();
}
function tick() {
    if (! model.isPieceActive()) {
        var activeIndex = randN(pieceLayoutTemplates.length);
        model.activePiece = new Piece(activeIndex + 1, pieceLayoutTemplates[activeIndex]);
        model.activePiece.centerAndRaise();
        if (! model.activePiece.canMove(0, 0)) {
            clearInterval(model.interval);
            model.interval = null;
            model.activePiece = null;
            model.state = STATE.OVER;
        }
    } else  if (model.activePiece.canMove(1, 0)) {
        model.activePiece.move(1, 0); // move
    } else {
        lockActivePiece();
    }
    paint();
}

document.addEventListener('keydown', function(event) {
    if (model.state == STATE.PAUSED) {
        switch (event.code) {
            case 'KeyP':
                model.interval = setInterval(tick, TICK_INTERVAL);
                model.state = STATE.IN_PROGRESS;
                paint();
                break;
        }
    } else if (model.state == STATE.IN_PROGRESS) {
        switch (event.code) {
            case 'ArrowUp':
                if (model.isPieceActive() && model.activePiece.canRotate(1)) {
                    model.activePiece.rotate(1);
                    paint();
                }
                break;
            case 'ArrowDown':
                if (model.isPieceActive()) {
                    while (model.activePiece.canMove(1, 0)) {
                        model.activePiece.move(1, 0);
                    }
                    lockActivePiece();
                    paint();
                }
                break;
            case 'ArrowLeft':
                if (model.isPieceActive() && model.activePiece.canMove(0, -1)) {
                    model.activePiece.move(0, -1);
                    paint();
                }
                break;
            case 'ArrowRight':
                if (model.isPieceActive() && model.activePiece.canMove(0, 1)) {
                    model.activePiece.move(0, 1);
                    paint();
                }
                break;
            case 'KeyP':
                clearInterval(model.interval);
                model.interval = null;
                model.state = STATE.PAUSED;
                paint();
                break;
        }
    }
});
model.interval = setInterval(tick, TICK_INTERVAL);
model.state = STATE.IN_PROGRESS;
tick();
