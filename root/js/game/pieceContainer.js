define(function (require) {
    var Piece       = require('game/piece');
    var Block       = require('game/block');
    var Cycle       = require('util/cycle');
    var Grid        = require('util/grid');
    var random      = require('util/random');
    var pieceData   = require('pieces');

    var pieces;

    function parsePieces(data) {
        pieces = Object.create(null);

        Object.keys(data).forEach(function(name){
            var piece = data[name].grid;
            var rows = piece.length;
            var cols = piece[0].length;

            var grid = new Grid(cols, rows);

            for (var i = piece.length - 1, row = 0; i >= 0; i--, row++) {
                var line = piece[i].split('');

                for(var col = 0; col < line.length; col++) {
                    grid.set(col, row, new Block(line[col] === 'x'));
                }
            }

            pieces[name] = new Piece(grid, data[name].color, name);
        });
    }
    
    parsePieces(pieceData);

    function PieceContainer() {
        var self = this;
        
        self._pieces = Object.create(null);

        Object.keys(pieces).forEach(function (name) {
            var piece = {
                'states': new Array(4)
            };

            piece.state = new Cycle(4);
            piece.states[0] = pieces[name];

            for (var i = 1; i < 4; i++) {
                piece.states[i] = new Piece(
                    piece.states[i - 1].grid.rotateLeft(),
                    piece.states[i - 1].color,
                    piece.states[i - 1].name);
            }

            self._pieces[name] = piece;
        });
    };

    PieceContainer.prototype = {

        constructor: PieceContainer,

        getPiece: function PieceContainer_getPiece(name) {
            var p = this._pieces[name];

            return p.states[p.state.curr].clone();
        },

        forEach: function PieceContainer_forEach(action) {
            var self = this;

            Object.keys(this._pieces).forEach(function (name) {
                action(name, self.getPiece(name));
            });
        },

        rotate: function PieceContainer_rotate(name, dir) {
            var p = this._pieces[name];

            if (dir == 'right') {
                p.state.next();
            } else if (dir == 'left') {
                p.state.prev();
            } else {
                throw "unknown direction: '" + dir + "'";
            }
        },

        resetPiece: function PieceContainer_resetPiece(name) {
            this._pieces[name].state.reset();
        },

        rndPiece: function PieceContainer_rndPiece() {
            var names = Object.keys(this._pieces);

            var rnd = random.getRandomInt(0, names.length - 1);

            return names[rnd];
        }
    }

    return PieceContainer;
});
