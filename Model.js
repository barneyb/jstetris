function Model(config) {
    // "constants"
    this.ROWS = config.rows;
    this.COLS = config.cols;
    this.LINES_PER_LEVEL = config.linesPerLevel;
    this.INITIAL_TICK_DELTA = config.initialTickDelta;
    this.PIECE_TEMPLATES = config.templates;

    // variables
    this.tickDelta = this.INITIAL_TICK_DELTA;
    this.state = Model.STATE.NOT_STARTED;
    this.lineCount = 0;
    this.score = 0;
    this.level = 1;
    this.activePiece = null;
    this.queuedPiece = null;
    this.interval = null;
    this.board = [];
    for (var r = 0; r < this.ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < this.COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
    this.completeLines = [];
    this.paintCallback = function() {};

    this._getPiece = function _getPiece() {
        var activeIndex = Math.randN(this.PIECE_TEMPLATES.length);
        var p = new Piece(this, activeIndex + 1, this.PIECE_TEMPLATES[activeIndex]);
        p.centerAndRaise();
        return p;
    };
    this._tick = (function() {
        if (this.isGamePaused()) {
            return;
        } else if (this.isLineClearing()) {
            for (var i = 0; i < this.completeLines.length; i++) {
                for (var rr = this.completeLines[i]; rr > 0; rr--) {
                    for (var cc = 0; cc < this.COLS; cc++) {
                        this.board[rr][cc] = this.board[rr - 1][cc];
                    }
                }
                for (var cz = 0; cz < this.COLS; cz++) {
                    this.board[0][cz] = BLACK;
                }
            }
            this.completeLines = [];
            this.state = Model.STATE.IN_PROGRESS
        } else if (! this.isPieceActive()) {
            if (this.queuedPiece.canMove(0, 0)) {
                this.activePiece = this.queuedPiece;
                this.queuedPiece = this._getPiece();
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
}
Model.STATE = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    LINE_CLEARING: 2,
    PAUSED: 3,
    OVER: 4
};

Model.prototype.isGameInProgress = function isGameInProgress() {
    return model.state == Model.STATE.IN_PROGRESS;
};
Model.prototype.isLineClearing = function isLineClearing() {
    return model.state == Model.STATE.LINE_CLEARING;
};
Model.prototype.isGamePaused = function isGamePaused() {
    return model.state == Model.STATE.PAUSED;
};
Model.prototype.isGameOver = function isGameOver() {
    return model.state == Model.STATE.OVER;
};

Model.prototype.pause = function pause() {
    this.state = Model.STATE.PAUSED;
};
Model.prototype.unpause = function unpause() {
    this.state = Model.STATE.IN_PROGRESS;
};

Model.prototype.startGame = function startGame() {
    this.queuedPiece = this._getPiece();
    this.interval = setInterval(this._tick, this.tickDelta);
    this.state = Model.STATE.IN_PROGRESS;
    this._tick();
};
Model.prototype.gameOver = function gameOver() {
    this.state = Model.STATE.OVER;
    clearInterval(this.interval);
    this.interval = null;
    this.activePiece = null;
};

Model.prototype.isCellEmpty = function isCellEmpty(r, c) {
    return this.board[r][c] == BLACK;
};
Model.prototype.getCellColor = function getCellColor(r, c) {
    if (this.state == Model.STATE.PAUSED) {
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
            this.score += 2;
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
    this.score += 10;
    this.processLines();
};
Model.prototype.processLines = function processLines() {
    rowLoop:
    for (var r = 0; r < this.ROWS; r++) {
        for (var c = 0; c < this.COLS; c++) {
            if (this.isCellEmpty(r, c)) {
                continue rowLoop;
            }
        }
        this.state = Model.STATE.LINE_CLEARING;
        this.lineCount += 1;
        this.completeLines.push(r);
    }
    if (this.completeLines.length) {
        this.score += 100 * Math.pow(2, this.completeLines.length - 1);
        var newLevel = Math.floor(this.lineCount / this.LINES_PER_LEVEL) + 1;
        if (this.level != newLevel) {
            this.level = newLevel;
            this.tickDelta = this.INITIAL_TICK_DELTA * Math.pow(0.94, this.level - 1);
            clearInterval(this.interval);
            this.interval = setInterval(this._tick, this.tickDelta);
        }
    }
};
