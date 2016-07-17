BLACK = 0;
STATE = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    PAUSED: 2,
    OVER: 3
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
    board: document.getElementById("board")
};

function paint() {
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
