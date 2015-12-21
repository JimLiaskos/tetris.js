
function PieceContainer(pieces) {
	var self = this;

	self._pieces = Object.create(null);

	Object.keys(pieces).forEach(function(name) {
		var piece = {
			'states': new Array(4)
		};

		piece.state = new Cycle(4);
		piece.states[0] = pieces[name];

		for(var i = 1; i < 4; i++) {
			piece.states[i] = new Piece(
				piece.states[i - 1].grid.rotateLeft(), 
				piece.states[i - 1].color, 
				piece.states[i - 1].name);
		}

		self._pieces[name] = piece;
	});
}

PieceContainer.prototype.getPiece = function PieceContainer_getPiece(name) {
	var p = this._pieces[name];

	return p.states[p.state.curr].clone();
};

PieceContainer.prototype.forEach = function PieceContainer_forEach(action) {
	var self = this;

	Object.keys(this._pieces).forEach(function(name) {
		action(name, self.getPiece(name));
	});
}

PieceContainer.prototype.rotate = function PieceContainer_rotate(name, dir) {
	var p = this._pieces[name];

	if(dir == 'right') {
		p.state.next();
	} else if (dir == 'left') {
		p.state.prev();
	} else {
		throw "unknown direction: " + dir;
	}
};

PieceContainer.prototype.resetPiece = function PieceContainer_resetPiece(name) {
	var p = this._pieces[name].state.reset();
};

PieceContainer.prototype.rndPiece = function() {
	var names = Object.keys(this._pieces);

	var rnd = getRandomInt(0, names.length - 1);

	return this.getPiece(names[rnd]);
};

