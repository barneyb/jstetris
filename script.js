ROWS = 20;
COLS = 10;
BLACK = 0;
boardEl = document.getElementById("board");
board = [];
pieces = [
    [0, 0, 1, 0, 2, 0, 3, 0], // cyan I
    [0, 0, 1, 0, 2, 0, 2, 1], // blue J
    [0, 1, 1, 1, 2, 1, 2, 0], // orange L
    [1, 0, 1, 1, 2, 0, 2, 1], // yellow O
    [0, 1, 1, 1, 1, 0, 2, 0], // lime S
    [0, 0, 1, 0, 2, 0, 1, 1], // purple T
    [0, 0, 1, 0, 1, 1, 2, 1] // red Z
];
activePiece = null;
activeColor = BLACK;
interval = null;
for (var r = 0; r < ROWS; r++) {
    board[r] = [];
    for (var c = 0; c < COLS; c++) {
        board[r][c] = BLACK;
    }
}
function getCellColor(r, c) {
    return board[r][c];
}
function paint() {
    var content = "";
    for (var r = 0; r < ROWS; r++) {
        content += '<div class="row">';
        for (var c = 0; c < COLS; c++) {
            content += '<div class="cell cell-' + getCellColor(r, c) + '"></div>';
        }
        content += "</div>";
    }
    boardEl.innerHTML = content;
}
function draw(piece, color) {
    for (var i = 0; i < piece.length; i += 2) {
        board[piece[i + 1]][piece[i]] = color;
    }
}
function move(piece, dx, dy) {
    for (var i = 0; i < piece.length; i++) {
        piece[i] += i % 2 ? dy : dx;
    }
}
function canMove(piece, dx, dy) {
    move(piece, dx, dy);
    var result = true;
    for (var i = 0; i < piece.length; i += 2) {
        var x = piece[i],
            y = piece[i + 1];
        if (x < 0 || x >= COLS) {
            result = false;
            break;
        }
        if (y < 0 || y >= ROWS) {
            result = false;
            break;
        }
        if (board[y][x] != BLACK) {
            result = false;
            break;
        }
    }
    move(piece, -dx, -dy);
    return result;
}
function tick() {
    var curr = activePiece;
    if (activePiece == null) {
        var activeIndex = Math.floor(Math.random() * pieces.length);
        curr = activePiece = pieces[activeIndex].slice();
        activeColor = activeIndex + 1;
        move(curr, 3, 0);
        if (! canMove(curr, 0, 0)) {
            boardEl.innerHTML = '<h2>Game Over!</h2>';
            clearInterval(interval);
            return;
        }
    } else {
        draw(curr, BLACK); // erase
        if (canMove(curr, 0, 1)) {
            move(curr, 0, 1); // move
        } else {
            activePiece = null;
        }
    }
    draw(curr, activeColor);
    paint();
}
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            console.log("left?");
            if (canMove(activePiece, -1, 0)) {
                console.log("left");
                move(activePiece, -1, 0)
            }
            break;
        case 'ArrowRight':
            console.log("right?");
            if (canMove(activePiece, 1, 0)) {
                console.log("right");
                move(activePiece, 1, 0)
            }
            break;
        default:
            console && console.log && console.log(event.code, "is ignored");
    }
});
interval = setInterval(tick, 200);
tick();
