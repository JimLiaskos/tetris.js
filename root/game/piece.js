function Piece(grid, color, name) {

	if(grid._height !== grid._width) {
		throw new "Only perfect squares acceptable for pieces."
	}

	this.grid = grid;
	this.name = name;
	this.color = color;
}

Piece.prototype.clone = function Piece_clone() {
	return new Piece(this.grid, this.color, this.name);
};