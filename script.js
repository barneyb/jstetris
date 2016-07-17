BLACK = 0;
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

model = new Model();
ui = {
    lineCount: document.getElementById("lineCount"),
    status: document.getElementById("status"),
    board: document.getElementById("board")
};

function paint() {
    if (model.isGamePaused()) {
        ui.status.innerHTML = "Paused";
    } else if (model.isGameOver()) {
        ui.status.innerHTML = "Game Over!";
    } else {
        ui.status.innerHTML = "";
    }
    ui.lineCount.innerHTML = model.lineCount == 1 ? "1 line" : (model.lineCount + " lines");
    var content = "";
    for (var r = 0; r < Model.ROWS; r++) {
        content += '<div class="row">';
        for (var c = 0; c < Model.COLS; c++) {
            content += '<div class="cell cell-' + model.getCellColor(r, c) + '"></div>';
        }
        content += "</div>";
    }
    ui.board.innerHTML = content;
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
                if (model.isPieceActive() && model.activePiece.canRotate(1)) {
                    model.activePiece.rotate(1);
                    paint();
                }
                break;
            case 'ArrowDown':
                if (model.isPieceActive()) {
                    model.dropActivePiece();
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
                model.pause();
                paint();
                break;
        }
    }
});
model.paintCallback = paint;
model.startGame();
