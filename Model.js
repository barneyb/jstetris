function Model() {
    this.tickDelta = Model.INITIAL_TICK_DELTA;
    this.state = STATE.NOT_STARTED;
    this.lineCount = 0;
    this.activePiece = null;
    this.queuedPiece = null;
    this.interval = null;
    this.board = [];
    for (var r = 0; r < Model.ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < Model.COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
    this.completeLines = [];
}
Model.ROWS = 20;
Model.COLS = 10;
Model.INITIAL_TICK_DELTA = 300;

Model.prototype.isGameInProgress = function isGameInProgress() {
    return model.state == STATE.IN_PROGRESS;
};
Model.prototype.isLineClearing = function isLineClearing() {
    return model.state == STATE.LINE_CLEARING;
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
    function getPiece() {
        var activeIndex = Math.randN(pieceLayoutTemplates.length);
        var p = new Piece(activeIndex + 1, pieceLayoutTemplates[activeIndex]);
        p.centerAndRaise();
        return p;
    }
    this.queuedPiece = getPiece();
    var tick = (function() {
        if (this.isGamePaused()) {
            return;
        } else if (this.isLineClearing()) {
            for (var i = 0; i < this.completeLines.length; i++) {
                for (var rr = this.completeLines[i]; rr > 0; rr--) {
                    for (var cc = 0; cc < Model.COLS; cc++) {
                        this.board[rr][cc] = this.board[rr - 1][cc];
                    }
                }
                for (var cz = 0; cz < Model.COLS; cz++) {
                    this.board[0][cz] = BLACK;
                }
            }
            this.completeLines = [];
            this.state = STATE.IN_PROGRESS
        } else if (! this.isPieceActive()) {
            if (this.queuedPiece.canMove(0, 0)) {
                this.activePiece = this.queuedPiece;
                this.queuedPiece = getPiece();
            } else {
                this.gameOver();
            }
        } else  if (this.activePiece.canMove(1, 0)) {
            this.activePiece.move(1, 0); // move
        } else {
            this.lockActivePiece();
        }
        this.paintCallback();
    }).bind(this);
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
        this.state = STATE.LINE_CLEARING;
        this.lineCount += 1;
        this.completeLines.push(r);
    }
};
