function Model() {
    this.tickDelta = Model.INITIAL_TICK_DELTA;
    this.state = STATE.NOT_STARTED;
    this.lineCount = 0;
    this.activePiece = null;
    this.queuedPiece = null;
    this.interval = null;
    this.board = [];
    this.initializeBoard();
}
Model.ROWS = 20;
Model.COLS = 10;
Model.INITIAL_TICK_DELTA = 300;
Model.prototype.initializeBoard = function initializeBoard() {
    for (var r = 0; r < Model.ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < Model.COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
};

Model.prototype.isGameInProgress = function isGameInProgress() {
    return model.state == STATE.IN_PROGRESS;
};
Model.prototype.isGamePaused = function isGamePaused() {
    return model.state == STATE.PAUSED;
};
Model.prototype.isGameOver = function isGameOver() {
    return model.state == STATE.OVER;
};

Model.prototype.pause = function pause() {
    this.state = STATE.PAUSED;
};
Model.prototype.unpause = function unpause() {
    this.state = STATE.IN_PROGRESS;
};

Model.prototype.startGame = function startGame() {
    var self = this;
    function getPiece() {
        var activeIndex = Math.randN(pieceLayoutTemplates.length);
        var p = new Piece(activeIndex + 1, pieceLayoutTemplates[activeIndex]);
        p.centerAndRaise();
        return p;
    }
    self.queuedPiece = getPiece();
    function tick() {
        if (self.isGamePaused()) {
            return;
        } else if (! self.isPieceActive()) {
            if (self.queuedPiece.canMove(0, 0)) {
                self.activePiece = self.queuedPiece;
                self.queuedPiece = getPiece();
            } else {
                self.gameOver();
            }
        } else  if (self.activePiece.canMove(1, 0)) {
            self.activePiece.move(1, 0); // move
        } else {
            self.lockActivePiece();
        }
        self.paintCallback();
    }
    this.interval = setInterval(tick, this.tickDelta);
    this.state = STATE.IN_PROGRESS;
    tick();
};
Model.prototype.gameOver = function gameOver() {
    this.state = STATE.OVER;
    clearInterval(this.interval);
    this.interval = null;
    this.activePiece = null;
};

Model.prototype.isCellEmpty = function isCellEmpty(r, c) {
    return this.board[r][c] == BLACK;
};
Model.prototype.getCellColor = function getCellColor(r, c) {
    if (this.state == STATE.PAUSED) {
        return BLACK;
    }
    if (this.activePiece != null && this.activePiece.isAt(r, c)) {
        return this.activePiece.color;
    }
    return this.board[r][c];
};

Model.prototype.isPieceActive = function isPieceActive() {
    return this.activePiece != null;
};
Model.prototype.isPieceQueued = function isPieceQueued() {
    return this.queuedPiece != null;
};
Model.prototype.drop = function drop() {
    if (this.isPieceActive()) {
        while (this.activePiece.canMove(1, 0)) {
            this.activePiece.move(1, 0);
        }
        this.lockActivePiece();
        this.paintCallback();
    }
};
Model.prototype.rotate = function rotate() {
    if (this.isPieceActive() && this.activePiece.canRotate(1)) {
        this.activePiece.rotate(1);
        this.paintCallback();
    }
};
Model.prototype.move = function move(r, c) {
    if (this.isPieceActive() && this.activePiece.canMove(r, c)) {
        this.activePiece.move(r, c);
        this.paintCallback();
    }
};
Model.prototype.lockActivePiece = function lockActivePiece() {
    var layout = this.activePiece.getCurrentLayout();
    for (var i = 0; i < layout.length; i += 2) {
        this.board[layout[i]][layout[i + 1]] = this.activePiece.color;
    }
    this.activePiece = null;
    this.processLines();
};
Model.prototype.processLines = function processLines() {
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
