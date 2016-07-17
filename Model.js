function Model() {
    this.tickDelta = 300;
    this.state = STATE.NOT_STARTED;
    this.lineCount = 0;
    this.activePiece = null;
    this.interval = null;
    this.board = [];
    this.initializeBoard();
}
Model.ROWS = 20;
Model.COLS = 10;
Model.prototype.initializeBoard = function() {
    for (var r = 0; r < Model.ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < Model.COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
};
Model.prototype.isPieceActive = function() {
    return this.activePiece != null;
};
Model.prototype.isGameInProgress = function() {
    return model.state == STATE.IN_PROGRESS;
};
Model.prototype.isGamePaused = function() {
    return model.state == STATE.PAUSED;
};
Model.prototype.isGameOver = function() {
    return model.state == STATE.OVER;
};
Model.prototype.pause = function() {
    clearInterval(this.interval);
    this.interval = null;
    this.state = STATE.PAUSED;
};
Model.prototype.unpause = function() {
    this.interval = setInterval(tick, this.tickDelta);
    this.state = STATE.IN_PROGRESS;
};
Model.prototype.gameOver = function() {
    this.state = STATE.OVER;
    clearInterval(this.interval);
    this.interval = null;
    this.activePiece = null;
};
Model.prototype.startGame = function(tick) {
    this.interval = setInterval(tick, this.tickDelta);
    this.state = STATE.IN_PROGRESS;
    tick();
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
Model.prototype.lockActivePiece = function() {
    this.activePiece.lock();
    this.activePiece = null;
    this.processLines();
};
Model.prototype.processLines = function() {
    rowLoop:
    for (var r = 0; r < Model.ROWS; r++) {
        for (var c = 0; c < Model.COLS; c++) {
            if (this.isCellEmpty(r, c)) {
                continue rowLoop;
            }
        }
        this.lineCount += 1;
        for (var rr = r; rr > 0; rr--) {
            for (var cc = 0; cc < Model.COLS; cc++) {
                this.board[rr][cc] = this.board[rr - 1][cc];
            }
        }
        for (var cz = 0; cz < Model.COLS; cz++) {
            this.board[0][cz] = BLACK;
        }
    }
};
Model.prototype.dropActivePiece = function() {
    while (this.activePiece.canMove(1, 0)) {
        this.activePiece.move(1, 0);
    }
    this.lockActivePiece();
};
