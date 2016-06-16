function Piece(color, layoutTemplates) {
    this.color = color;
    this.layouts = [];
    for (var i = 0; i < layoutTemplates.length; i++) {
        this.layouts[i] = layoutTemplates[i].slice(0)
    }
    this.rotation = randN(this.layouts.length);
    this.layout = this.layouts[this.rotation];
}
Piece.prototype.centerAndRaise = function centerAndRaise() {
    var minRow = ROWS, minCol = COLS, maxCol = 0;
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        minRow = Math.min(minRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
    }
    var dr = -minRow;
    var dc = (COLS - (maxCol - minCol + 1)) / 2 - minCol;
    if (randBool()) {
        dc = Math.floor(dc);
    } else {
        dc = Math.ceil(dc);
    }
    this.move(dr, dc);
};
Piece.prototype.rotate = function rotate(dr) {
    this.rotation += dr;
    this.rotation %= this.layouts.length;
    this.layout = this.layouts[this.rotation];
    kickLoop:
        while (true) {
            for (var i = 0; i < this.layout.length; i += 2) {
                var c = this.layout[i + 1];
                if (c < 0) {
                    this.move(0, 1);
                    continue kickLoop;
                }
                if (c >= COLS) {
                    this.move(0, -1);
                    continue kickLoop;
                }
            }
            break;
        }
};
Piece.prototype.canRotate = function canRotate(dr) {
    var rot = this.rotation + dr;
    rot %= this.layouts.length;
    var layout = this.layouts[rot];
    var dc = 0;
    kickLoop:
        while (true) {
            for (var i = 0; i < layout.length; i += 2) {
                var r = layout[i],
                    c = layout[i + 1] + dc;
                if (c < 0) {
                    dc += 1;
                    continue kickLoop;
                }
                if (c >= COLS) {
                    dc -= 1;
                    continue kickLoop;
                }
                if (r < 0) {
                    continue; // allow rotating off the top of the board
                }
                if (r >= ROWS) {
                    return false;
                }
                if (board[r][c] != BLACK) {
                    return false;
                }
            }
            break;
        }
    return true;
};
Piece.prototype.move = function move(dr, dc) {
    for (var i = 0; i < this.layouts.length; i++) {
        var layout = this.layouts[i];
        for (var j = 0; j < layout.length; j++) {
            layout[j] += j % 2 ? dc : dr
        }
    }
};
Piece.prototype.canMove = function canMove(dr, dc) {
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i] + dr,
            c = this.layout[i + 1] + dc;
        if (c < 0 || c >= COLS) {
            return false;
        }
        if (r < 0) {
            continue; // allow rotating off the top of the board
        }
        if (r >= ROWS) {
            return false;
        }
        if (board[r][c] != BLACK) {
            return false;
        }
    }
    return true;
};
Piece.prototype.isAt = function isAt(r, c) {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i] == r && this.layout[i + 1] == c) {
            return true;
        }
    }
    return false;
};
Piece.prototype.lock = function lock() {
    for (var i = 0; i < this.layout.length; i += 2) {
        board[this.layout[i]][this.layout[i + 1]] = this.color;
    }
};
