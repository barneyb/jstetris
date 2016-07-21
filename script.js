BLACK = 0;

Math.randN = function randN(n) {
    return Math.floor(Math.random() * n);
};
Math.randBool = function randBool() {
    return Math.randN(2) == 0;
};

model = new Model({
    rows: 20,
    cols: 10,
    linesPerLevel: 10,
    initialTickDelta: 300,
    templates: pieceLayoutTemplates
});
ui = {
    container: document.getElementById("container"),
    level: document.getElementById("level"),
    lineCount: document.getElementById("lineCount"),
    score: document.getElementById("score"),
    status: document.getElementById("status"),
    piecePreview: document.getElementById("piecePreview"),
    board: document.getElementById("board")
};
boardWidth = model.COLS * (4 + 22 + 4 + 1);
ui.container.style.width = (boardWidth + 210) + "px";
ui.board.style.width = boardWidth + "px";
ui.piecePreview.style.width = ((model.COLS % 2 == 0 ? 4 : 5) * (20 + 1)) + "px";

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
    ui.level.innerHTML = model.level;
    ui.lineCount.innerHTML = model.lineCount;
    ui.score.innerHTML = model.score;
    var content = "";
    for (r = 0; r < model.ROWS; r++) {
        content += '<div id="row-' + r + '" class="row">';
        for (c = 0; c < model.COLS; c++) {
            content += '<div class="cell cell-' + model.getCellColor(r, c) + '"></div>';
        }
        content += "</div>";
    }
    ui.board.innerHTML = content;
    for (var i = 0; i < model.completeLines.length; i++) {
        document.getElementById('row-' + model.completeLines[i]).className += " complete";
    }
    if (model.isPieceQueued()) {
        var piece = model.queuedPiece;
        var bounds = piece.getBounds();
        var rows = Math.max(4, bounds.maxRow - bounds.minRow + 1);
        var cols = Math.max(4, bounds.maxCol - bounds.minCol + 1);
        if (model.COLS % 2 != cols % 2) {
            cols += 1;
        }
        var firstCol = Math.floor((model.COLS - cols) / 2);
        content = "";
        for (r = 0; r < rows; r++) {
            content += '<div class="row">';
            for (c = firstCol; c < firstCol + cols; c++) {
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
