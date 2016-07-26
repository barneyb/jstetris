function Model(config) {
    EventDispatcher.call(this);
    // "constants"
    if (config.templates == null) {
        throw new Error("Model config MUST include templates. All other settings are optional.");
    }
    this.PIECE_TEMPLATES = config.templates;
    this.ROWS = config.rows || 20;
    this.COLS = config.cols || 10;
    this.LINES_PER_LEVEL = config.linesPerLevel || 10;
    this.INITIAL_TICK_DELTA = config.initialTickDelta || 300;
    this.LEVEL_TICK_MULTIPLIER = config.levelTickMultiplier || 0.94;
    this.SCORING = config.scoring || {
            line: function(n) { return 100 * Math.pow(2, n - 1); },
            drop: function(n) { return n * 2 },
            lock: 10,
            levelMultiplier: 1.05
        };

    // variables
    this.tickDelta = this.INITIAL_TICK_DELTA;
    this.state = Model.STATE.NOT_STARTED;

    this._getPiece = function _getPiece() {
        var activeIndex;
        if (window.getRandomInteger != undefined) {
            activeIndex = getRandomInteger(this.PIECE_TEMPLATES.length);
        } else if (window.getRandomPieceIndex != undefined && this.PIECE_TEMPLATES.length == 7) {
            activeIndex = getRandomPieceIndex();
        } else {
            activeIndex = Math.randN(this.PIECE_TEMPLATES.length);
        }
        var p = new Piece(this, activeIndex + 1, this.PIECE_TEMPLATES[activeIndex]);
        p.centerAndRaise();
        return p;
    };
    this._tick = (function() {
        if (this.isLineClearing()) {
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
            this.state = Model.STATE.IN_PROGRESS;
            this.trigger('change:board', this.board);
        } else if (! this.isPieceActive()) {
            if (this.queuedPiece && this.queuedPiece.canMove(0, 0)) {
                this.activePiece = this.queuedPiece;
                this.trigger('change:active-piece', this.activePiece);
                this.queuedPiece = this._getPiece();
                this.trigger('change:queued-piece', this.queuedPiece);
            } else {
                this.gameOver();
            }
        } else  if (this.activePiece.canMove(1, 0)) {
            this.activePiece.move(1, 0); // move
            this.trigger('change:active-piece', this.activePiece);
        } else {
            this.lockActivePiece();
        }
    }).bind(this);
}
Model.prototype = Object.create(EventDispatcher.prototype);
Model.prototype.constructor = Model;
Model.STATE = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    LINE_CLEARING: 2,
    PAUSED: 3,
    OVER: 4
};

Model.prototype.isGameInProgress = function isGameInProgress() {
    return this.state == Model.STATE.IN_PROGRESS;
};
Model.prototype.isLineClearing = function isLineClearing() {
    return this.state == Model.STATE.LINE_CLEARING;
};
Model.prototype.isGamePaused = function isGamePaused() {
    return this.state == Model.STATE.PAUSED;
};
Model.prototype.isGameOver = function isGameOver() {
    return this.state == Model.STATE.OVER;
};

Model.prototype.pause = function pause() {
    this.state = Model.STATE.PAUSED;
    if (this.interval != null) {
        clearInterval(this.interval);
    }
    this.interval = null;
    this.trigger('pause-game');
};
Model.prototype.unpause = function unpause() {
    this.state = Model.STATE.IN_PROGRESS;
    if (this.interval != null) {
        clearInterval(this.interval);
    }
    this.interval = setInterval(this._tick, this.tickDelta);
    this.trigger('unpause-game');
};

Model.prototype.startGame = function startGame() {
    this.trigger('start-game');
    this.lineCount = 0;
    this.trigger('change:line-count', this.lineCount);
    this.score = 0;
    this.trigger('change:score', this.score);
    this.level = 1;
    this.trigger('change:level', this.level);
    this.activePiece = null;
    this.queuedPiece = this._getPiece();
    this.trigger('change:queued-piece', this.queuedPiece);
    this.board = [];
    for (var r = 0; r < this.ROWS; r++) {
        this.board[r] = [];
        for (var c = 0; c < this.COLS; c++) {
            this.board[r][c] = BLACK;
        }
    }
    this.trigger('change:board', this.board);
    this.completeLines = [];
    if (this.interval != null) {
        clearInterval(this.interval);
    }
    this.interval = setInterval(this._tick, this.tickDelta);
    this.state = Model.STATE.IN_PROGRESS;
    this._tick();
};
Model.prototype.gameOver = function gameOver() {
    this.state = Model.STATE.OVER;
    clearInterval(this.interval);
    this.interval = null;
    this.activePiece = null;
    this.trigger("game-over");
};

Model.prototype.isCellEmpty = function isCellEmpty(r, c) {
    if (r < 0 || c < 0 || r >= this.ROWS || c >= this.COLS) {
        throw new Error("There is no [" + r + ", " + c + "] on the board.")
    }
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
        var dropDistance = 0;
        while (this.activePiece.canMove(1, 0)) {
            this.activePiece.move(1, 0);
            dropDistance += 1;
        }
        this.addPoints('drop', dropDistance);
        this.lockActivePiece();
    }
};
Model.prototype.rotate = function rotate() {
    if (this.isPieceActive() && this.activePiece.canRotate(1)) {
        this.activePiece.rotate(1);
        this.trigger('change:active-piece', this.activePiece);
    }
};
Model.prototype.move = function move(r, c) {
    if (this.isPieceActive() && this.activePiece.canMove(r, c)) {
        this.activePiece.move(r, c);
        this.trigger('change:active-piece', this.activePiece);
    }
};
Model.prototype.lockActivePiece = function lockActivePiece() {
    var layout = this.activePiece.getCurrentLayout();
    for (var i = 0; i < layout.length; i += 2) {
        this.board[layout[i]][layout[i + 1]] = this.activePiece.color;
    }
    this.trigger('change:board', this.board);
    this.activePiece = null;
    this.addPoints('lock');
    this.processLines();
};

Model.prototype.addPoints = function addPoints(type) {
    var p = this.SCORING[type];
    if (p == null) {
        throw new Error("No scoring type '" + type + "' is known.");
    }
    if (typeof p == "function") {
        p = p.apply(null, Array.prototype.splice.call(arguments, 1));
    }
    var multiplier = Math.pow(this.SCORING.levelMultiplier, this.level - 1);
    p = Math.round(p * multiplier);
    this.score += p;
    this.trigger('change:score', this.score);
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
        this.trigger('row-completed', r);
    }
    if (this.completeLines.length) {
        this.trigger('change:line-count', this.lineCount);
        this.addPoints('line', this.completeLines.length);
        var newLevel = Math.floor(this.lineCount / this.LINES_PER_LEVEL) + 1;
        if (this.level != newLevel) {
            this.level = newLevel;
            this.tickDelta = this.INITIAL_TICK_DELTA * Math.pow(this.LEVEL_TICK_MULTIPLIER, this.level - 1);
            clearInterval(this.interval);
            this.interval = setInterval(this._tick, this.tickDelta);
        }
    }
};
