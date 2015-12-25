
function Grid (width, height) {
	this.width = width;
	this.height = height;
	this._array = new Array(width * height);
};

Grid.prototype.get = function Grid_get(x, y) {
	return this._array[this.getIndex(x, y)];
};

Grid.prototype.set = function Grid_set(x, y, value) {
	return this._array[this.getIndex(x, y)] = value;
};

Grid.prototype.forEach = function Grid_forEach(action) {

	for(var y = 0; y < this.height; y++) {
		for(var x = 0; x < this.width; x++) {
			action.call(this, x, y, this.get(x, y));
		}
	}
};

Grid.prototype.getIndex = function Grid_getIndex(x, y) {
	if(x < 0 || x >= this.width) {
		throw "Grid: x out of range.";
	}

	if(y < 0 || y >= this.height) {
		throw "Grid: y out of range.";
	}

	return x + this.width * y;
};

Grid.prototype.rotateLeft = function Grid_rotateLeft() {
	if(this.height !== this.width) {
		throw "Rotation available only for perfect squares."
	}

	var rotated_grid = new Grid(this.width, this.height);

	this.forEach(function(x, y, value) {
		var new_x = y;
		var new_y = -x + this.height - 1;

		rotated_grid.set(new_x, new_y, value);
	});

	return rotated_grid;
};

Grid.prototype.clone = function Grid_clone() {
	var newGrid = new Grid(this.width, this.height);

	this.forEach(function(x, y, value) {
		newGrid.set(x, y, value);
	});

	return newGrid;
};

Grid.prototype.contains = function Grid_contains(x, y) {
	return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
