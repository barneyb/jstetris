BLACK = 0;
STATE = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    LINE_CLEARING: 2,
    PAUSED: 3,
    OVER: 4
};

Math.randN = function randN(n) {
    return Math.floor(Math.random() * n);
};
Math.randBool = function randBool() {
    return Math.randN(2) == 0;
};

model = new Model();
ui = {
    lineCount: document.getElementById("lineCount"),
    status: document.getElementById("status"),
    piecePreview: document.getElementById("piecePreview"),
    board: document.getElementById("board")
};

function paint() {
    var r, c;
    if (model.isGamePaused()) {
        ui.status.innerHTML = "Paused";
        ui.status.className = "show";
    } else if (model.isGameOver()) {
        ui.status.innerHTML = "Game Over!";
        ui.status.className = "show";
    } else {
        ui.status.className = "hide";
    }
    ui.lineCount.innerHTML = model.lineCount;
    var ghost = null;
    var piece = model.activePiece;
    if (model.isPieceActive()) {
        ghost = piece.clone();
        while (ghost.canMove(1, 0)) {
            ghost.move(1, 0);
        }
    }
    var content = "";
    for (r = 0; r < Model.ROWS; r++) {
        content += '<div id="row-' + r + '" class="row">';
        for (c = 0; c < Model.COLS; c++) {
            var cls;
            if (model.isGamePaused()) {
                cls = "cell-" + BLACK;
            } else if (piece && piece.isAt(r, c)) {
                cls = "cell-" + piece.color;
            } else if (ghost && ghost.isAt(r, c)) {
                cls = "ghost cell-" + ghost.color;
            } else {
                cls = "cell-" + model.board[r][c];
            }
            content += '<div class="cell ' + cls + '"></div>';
        }
        content += "</div>";
    }
    ui.board.innerHTML = content;
    for (var i = 0; i < model.completeLines.length; i++) {
        document.getElementById('row-' + model.completeLines[i]).className += " complete";
    }
    if (model.isPieceQueued()) {
        piece = model.queuedPiece;
        content = "";
        for (r = 0; r < 4; r++) {
            content += '<div class="row">';
            for (c = 3; c < 7; c++) {
                content += '<div class="cell cell-' + (piece.isAt(r, c) ? piece.color : BLACK) + '"></div>';
            }
            content += "</div>";
        }
        ui.piecePreview.innerHTML = content;
    }
}

document.addEventListener('keydown', function(event) {
    if (model.isGamePaused()) {
        switch (event.code) {
            case 'KeyP':
                model.unpause();
                paint();
                break;
        }
    } else if (model.isGameInProgress()) {
        switch (event.code) {
            case 'ArrowUp':
                model.rotate();
                break;
            case 'ArrowDown':
                model.drop();
                break;
            case 'ArrowLeft':
                model.move(0, -1);
                break;
            case 'ArrowRight':
                model.move(0, 1);
                break;
            case 'KeyP':
                model.pause();
                paint();
                break;
        }
    }
});
model.paintCallback = paint;
model.startGame();
