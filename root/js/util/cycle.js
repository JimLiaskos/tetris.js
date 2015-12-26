
define(function () {
    
    function Cycle(count) {
        this._curr = 0;
        this._count = count;
    }

    Cycle.prototype = {
        constructor: Cycle,

        reset: function Cycle_reset() {
            this._curr = 0;
        },

        next: function Cycle_next() {
            this._curr++;

            if (this._curr == this._count) {
                this._curr = 0;
            };

            return this._curr;
        },

        prev: function Cycle_previous() {
            this._curr--;

            if (this._curr < 0) {
                this._curr = this._count - 1;
            };

            return this._curr;
        }
    }

    return Cycle;
});
