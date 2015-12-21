
function Grid (width, height) {
	this._width = width;
	this._height = height;
	this._array = new Array(width * height);
}

Grid.prototype.get = function Grid_get(x, y) {
	return this._array[this.getIndex(x, y)];
};

Grid.prototype.set = function Grid_set(x, y, value) {
	return this._array[this.getIndex(x, y)] = value;
};

Grid.prototype.forEach = function Grid_forEacg(action) {

	for(var y = 0; y < this._height; y++) {
		for(var x = 0; x < this._width; x++) {
			action.call(this, x, y, this.get(x, y));
		}
	}
};

Grid.prototype.getIndex = function Grid_getIndex(x, y) {
	if(x < 0 || x >= this._width) {
		throw "Grid: x out of range.";
	}

	if(y < 0 || y >= this._height) {
		throw "Grid: y out of range.";
	}

	return x + this._width * y;
};

Grid.prototype.rotateLeft = function Grid_rotateLeft() {
	if(this._height !== this._width) {
		throw "Rotation available only for perfect squares."
	}

	var rotated_grid = new Grid(this._width, this._height);

	this.forEach(function(x, y, value) {
		var new_x = y;
		var new_y = -x + this._height - 1;

		rotated_grid.set(new_x, new_y, value);
	});

	return rotated_grid;
};
