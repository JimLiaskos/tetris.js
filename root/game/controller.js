function Controller() {
	this._callbacks = Object.create(null);

	this._callbacks['m_left'] 	= [];
	this._callbacks['m_right'] 	= [];
	this._callbacks['r_left'] 	= [];
	this._callbacks['r_right']	= [];
}

Controller.prototype.addOnMoveLeftListener = function (callback) {
	this._callbacks['m_left'].push(callback);

	return this;
}

Controller.prototype.addOnMoveRightListener = function (callback) {
	this._callbacks['m_right'].push(callback);

	return this;
}

Controller.prototype.addOnRotateLeftListener = function (callback) {
	this._callbacks['r_left'].push(callback);

	return this;
}

Controller.prototype.addOnRotateRightListener = function (callback) {
	this._callbacks['r_right'].push(callback);

	return this;
}

Controller.prototype.fireCallbacks = function(eventName) {
	this._callbacks[eventName].forEach(function(cb) { cb(); })
};

Controller.prototype.fireMoveLeft = function() {
	this.fireCallbacks('m_left');
};

Controller.prototype.fireMoveRight = function() {
	this.fireCallbacks('m_right');
};

Controller.prototype.fireRotateLeft = function() {
	this.fireCallbacks('r_left');
};

Controller.prototype.fireRotateRight = function() {
	this.fireCallbacks('r_right');
};