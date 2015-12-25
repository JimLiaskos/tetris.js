var events = {
	'MoveLeft'		: 'MoveLeft',
	'MoveRight'		: 'MoveRight',
	'RotateLeft'	: 'RotateLeft',
	'RotateRight'	: 'RotateRight',
	'Descend'		: 'Descend',
	'Drop'			: 'Drop'
};

function Controller() {
	var self = this;
	self._callbacks = Object.create(null);

	Object.keys(events).forEach(function(name) {
		self._callbacks[name] = [];
	});
};

Controller.prototype.addOnMoveLeftListener = function (callback) {
	this._callbacks[events.MoveLeft].push(callback);

	return this;
};

Controller.prototype.addOnMoveRightListener = function (callback) {
	this._callbacks[events.MoveRight].push(callback);

	return this;
};

Controller.prototype.addOnRotateLeftListener = function (callback) {
	this._callbacks[events.RotateLeft].push(callback);

	return this;
};

Controller.prototype.addOnRotateRightListener = function (callback) {
	this._callbacks[events.RotateRight].push(callback);

	return this;
};

Controller.prototype.addOnDescendListener = function (callback) {
	this._callbacks[events.Descend].push(callback);

	return this;
};

Controller.prototype.addOnDropListener = function (callback) {
	this._callbacks[events.Drop].push(callback);

	return this;
};

Controller.prototype.fireCallbacks = function(ev) {
	var timestamp = new Date();

	this._callbacks[ev].forEach(function(cb) { cb(timestamp); })
};

Controller.prototype.fireMoveLeftEvent = function() {
	this.fireCallbacks(events.MoveLeft);
};

Controller.prototype.fireMoveRightEvent = function() {
	this.fireCallbacks(events.MoveRight);
};

Controller.prototype.fireRotateLeftEvent = function() {
	this.fireCallbacks(events.RotateLeft);
};

Controller.prototype.fireRotateRightEvent = function() {
	this.fireCallbacks(events.RotateRight);
};

Controller.prototype.fireDescendEvent = function() {
	this.fireCallbacks(events.Descend);
};

Controller.prototype.fireDropEvent = function() {
	this.fireCallbacks(events.Drop);
};
