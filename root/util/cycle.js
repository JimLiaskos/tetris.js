function Cycle(count) {
		this.curr = 0;
		this.count = count;
	}

Cycle.prototype.reset = function() {
	this.curr = 0;
};

Cycle.prototype.next = function Cycle_next() {
	this.curr++;

	if (this.curr == this.count) {
		this.curr = 0;
	};

	return this.curr;
};

Cycle.prototype.prev = function Cycle_previous() {
	this.curr--;

	if (this.curr < 0) {
		this.curr = this.count - 1;
	};

	return this.curr;
};