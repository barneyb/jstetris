function Piece(model, color, layoutTemplates) {
    this.model = model;
    this.color = color;
    this.layouts = [];
    for (var i = 0; i < layoutTemplates.length; i++) {
        this.layouts[i] = layoutTemplates[i].slice(0)
    }
    if (window.getRandomInteger != undefined) {
        this.rotation = getRandomInteger(this.layouts.length);
    } else if (window.getRandomPieceOrientation != undefined && this.layouts.length == 4) {
        this.rotation = getRandomPieceOrientation();
    } else {
        this.rotation = Math.randN(this.layouts.length);
    }
    this.layout = this.layouts[this.rotation];
}
Piece.prototype.getBounds = function getBounds() {
    var bounds = {
        minRow: this.model.ROWS,
        maxRow: 0,
        minCol: this.model.COLS,
        maxCol: 0
    };
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        bounds.minRow = Math.min(bounds.minRow, r);
        bounds.maxRow = Math.max(bounds.maxRow, r);
        bounds.minCol = Math.min(bounds.minCol, c);
        bounds.maxCol = Math.max(bounds.maxCol, c);
    }
    return bounds;
};
Piece.prototype.centerAndRaise = function centerAndRaise() {
    var bounds = this.getBounds();
    var dr = -bounds.minRow;
    var dc = (this.model.COLS - (bounds.maxCol - bounds.minCol + 1)) / 2 - bounds.minCol;
    if (window.getRandomBoolean != undefined ? getRandomBoolean() : Math.randBool()) {
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
                if (c >= this.model.COLS) {
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
                if (c >= this.model.COLS) {
                    dc -= 1;
                    continue kickLoop;
                }
                if (r < 0) {
                    continue; // allow rotating off the top of the board
                }
                if (r >= this.model.ROWS) {
                    return false;
                }
                if (! this.model.isCellEmpty(r, c)) {
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
    var hasIsAtLeftEdge = Piece.prototype.isAtLeftEdge != undefined;
    if (hasIsAtLeftEdge && this.isAtLeftEdge() && dc < 0) {
        return false;
    }
    var hasIsAtRightEdge = Piece.prototype.isAtRightEdge != undefined;
    if (hasIsAtRightEdge && this.isAtRightEdge() && dc > 0) {
        return false;
    }
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i] + dr,
            c = this.layout[i + 1] + dc;
        if (! hasIsAtLeftEdge && c < 0) {
            return false;
        }
        if (! hasIsAtRightEdge && c >= this.model.COLS) {
            return false;
        }
        if (r < 0) {
            continue; // allow rotating off the top of the board
        }
        if (r >= this.model.ROWS) {
            return false;
        }
        if (! this.model.isCellEmpty(r, c)) {
            return false;
        }
    }
    return true;
};

/**
 * I return whether any of the piece's four blocks are at the passed row/column
 * coordinates.
 *
 * @param r The row of the block in question
 * @param c The column of the block in question
 * @returns {boolean} Whether the piece is at the requested row and column.
 */
Piece.prototype.isAt = function isAt(r, c) {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i] == r && this.layout[i + 1] == c) {
            return true;
        }
    }
    return false;
};

Piece.prototype.getCurrentLayout = function getCurrentLayout() {
    return this.layout.slice(0);
};
