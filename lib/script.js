BLACK = 0;

Math.randN = function randN(n) {
    return Math.floor(Math.random() * n);
};
Math.randBool = function randBool() {
    return Math.randN(2) == 0;
};

model = new Model({
    templates: pieceLayoutTemplates
});
ui = {
    container: document.getElementById("container"),
    level: document.getElementById("level"),
    lineLegend: document.getElementById("lineLegend"),
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

if (window.labelLineCount != undefined) {
    ui.lineLegend.parentNode.removeChild(ui.lineLegend)
}

function pausedKeyListener(event) {
    switch (event.code) {
        case 'KeyP':
            model.unpause();
            break;
    }
}
function inProgressKeyListener(event) {
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
            break;
    }
}
function clearBoard() {
    drawBoard(BLACK);
}
function drawBoard(color) {
    var content = "";
    for (var r = 0, rl = model.board.length; r < rl; r++) {
        content += '<div id="row-' + r + '" class="row">';
        for (var c = 0, cl = model.board[r].length; c < cl; c++) {
            content += '<div id="cell-' + r + '-' + c + '" class="cell cell-' + (color == null ? (model.isPieceActive() && model.activePiece.isAt(r, c) ? model.activePiece.color : model.board[r][c]) : color) + '"></div>';
        }
        content += "</div>";
    }
    ui.board.innerHTML = content;
}
model.on('start-game', function() {
    ui.container.style.display = 'block';
    ui.status.className = "hide";
    document.addEventListener('keydown', inProgressKeyListener);
});
model.on('pause-game', function() {
    ui.status.innerHTML = "Paused";
    ui.status.className = "show";
    document.removeEventListener('keydown', inProgressKeyListener);
    document.addEventListener('keydown', pausedKeyListener);
    clearBoard();
});
model.on('unpause-game', function() {
    ui.status.className = "hide";
    document.removeEventListener('keydown', pausedKeyListener);
    document.addEventListener('keydown', inProgressKeyListener);
    drawBoard();
});
model.on('game-over', function() {
    ui.status.innerHTML = "Game Over!";
    ui.status.className = "show";
    document.removeEventListener('keydown', inProgressKeyListener);
    if (scoreInterval != null) {
        clearInterval(scoreInterval);
        scoreInterval = null;
        ui.score.innerHTML = model.score;
    }
});
model.on('change:level', function(l) {
    ui.level.innerHTML = l;
});
model.on('change:line-count', function(lc) {
    if (window.labelLineCount == undefined) {
        ui.lineCount.innerHTML = lc;
    } else {
        ui.lineCount.innerHTML = labelLineCount(lc);
    }
});
displayedScore = 0;
actualScore = null;
scoreInterval = null;
function rollScore() {
    displayedScore += Math.ceil((actualScore - displayedScore) / 5);
    ui.score.innerHTML = displayedScore;
    if (displayedScore >= actualScore) {
        clearInterval(scoreInterval);
        scoreInterval = null;
    }
}
model.on('change:score', function(s) {
    actualScore = s;
    if (scoreInterval != null) {
        return;
    }
    scoreInterval = setInterval(rollScore, 100);
    rollScore();
});
model.on('change:board', function() { drawBoard(); });
model.on('change:active-piece', function() { drawBoard(); });
model.on('change:queued-piece', function(piece) {
    var rows, cols;
    if (piece == null) {
        rows = cols = 4;
    } else {
        var bounds = piece.getBounds();
        rows = Math.max(4, bounds.maxRow - bounds.minRow + 1);
        cols = Math.max(4, bounds.maxCol - bounds.minCol + 1);
    }
    if (model.COLS % 2 != cols % 2) {
        cols += 1;
    }
    var firstCol = Math.floor((model.COLS - cols) / 2);
    content = "";
    for (r = 0; r < rows; r++) {
        content += '<div class="row">';
        for (c = firstCol; c < firstCol + cols; c++) {
            content += '<div class="cell cell-' + (piece && piece.isAt(r, c) ? piece.color : BLACK) + '"></div>';
        }
        content += "</div>";
    }
    ui.piecePreview.innerHTML = content;
});
model.on('row-completed', function(r) {
    document.getElementById('row-' + r).className += " complete";
});
model.startGame();
