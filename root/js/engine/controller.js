define(function (require) {
    var events = require('events');

    function Controller() {
        this._callbacks = Object.create(null);

        var self = this;

        Object.keys(events).forEach(function (name) {
            self._callbacks[name] = [];
        });
    };

    Controller.prototype = {
        constructor: Controller,

        _fireCallbacks: function Controller_fireCallbacks(ev) {
            var timestamp = new Date();

            this._callbacks[ev].forEach(function (cb) { cb(timestamp); })
        },

        addOnMoveLeftListener: function Controller_addOnMoveLeftListener(callback) {
            this._callbacks[events.MoveLeft].push(callback);

            return this;
        },

        addOnMoveRightListener: function Controller_addOnMoveRightListener(callback) {
            this._callbacks[events.MoveRight].push(callback);

            return this;
        },

        addOnRotateLeftListener: function Controller_addOnRotateLeftListener(callback) {
            this._callbacks[events.RotateLeft].push(callback);

            return this;
        },

        addOnRotateRightListener: function Controller_addOnRotateRightListener(callback) {
            this._callbacks[events.RotateRight].push(callback);

            return this;
        },

        addOnDescendListener: function Controller_addOnDescendListener(callback) {
            this._callbacks[events.Descend].push(callback);

            return this;
        },

        addOnDropListener: function Controller_addOnDropListener(callback) {
            this._callbacks[events.Drop].push(callback);

            return this;
        },

        fireMoveLeftEvent: function Controller_fireMoveLeftEvent() {
            this._fireCallbacks(events.MoveLeft);
        },

        fireMoveRightEvent: function Controller_fireMoveRightEvent() {
            this._fireCallbacks(events.MoveRight);
        },

        fireRotateLeftEvent: function Controller_fireRotateLeftEvent() {
            this._fireCallbacks(events.RotateLeft);
        },

        fireRotateRightEvent: function Controller_fireRotateRightEvent() {
            this._fireCallbacks(events.RotateRight);
        },

        fireDescendEvent: function Controller_fireDescendEvent() {
            this._fireCallbacks(events.Descend);
        },

        fireDropEvent: function Controller_fireDropEvent() {
            this._fireCallbacks(events.Drop);
        }
    }

    return Controller;
});
