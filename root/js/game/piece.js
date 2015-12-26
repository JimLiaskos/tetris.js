define(function () {
    function Piece(grid, color, name) {

        if (grid._height !== grid._width) {
            throw "Only perfect squares acceptable for pieces."
        }

        this.grid = grid;
        this.color = color;
        this.name = name;
    };

    Piece.prototype = {
        constructor: Piece,

        Piece_clone: function Piece_clone() {
            return new Piece(this.grid.clone(), this.color, this.name);
        }
    };

    return Piece;
});
