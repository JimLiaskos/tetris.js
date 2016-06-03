define(function (require) {
    var Grid = require('util/grid');
    var Block = require('game/block');
    var PieceContainer = require('game/pieceContainer');

    Tetris.PIECE_CNT = 4;

    function peek(array) {
        return array && array.length && array[array.length - 1];
    }

    function Tetris(options) {
        var self = this;

        options = options || {};

        var defaultOptions = {
            'pieceDefault': { 'x': 3, 'y': 19 },
            'frequency': options.frequency      || 1,
            'wellWidth': options.wellWidth      || 10,
            'wellHeight': options.wellHeight    || 25
        };

        this._options = defaultOptions;

        this.frequency = defaultOptions.frequency;

        this.pieceContainer = new PieceContainer();
        this.pieceQueue = new Array(Tetris.PIECE_CNT);
        this.well = new Grid(defaultOptions.wellWidth, defaultOptions.wellHeight);

        for (var i = 0; i < Tetris.PIECE_CNT; i++) {
            this.pieceQueue.push(this.pieceContainer.rndPiece());
        }

        this.piece = {
            'x': defaultOptions.pieceDefault.x,
            'y': defaultOptions.pieceDefault.y,
            'isColliding': false
        };

        Object.defineProperty(this.piece, "instance", {
            get: function () {
                return self.pieceContainer.getPiece(peek(self.pieceQueue));
            }
        });

        this.well.forEach(function (x, y) {
            this.set(x, y, new Block(false, x % 2 ? 'lightgray' : 'gray'));
        });
    };

    Tetris.prototype = {
        constructor: Tetris,

        round: function Tetris_round() {        
            if(this.piece.isColliding) {
                
                this.reset();
            }
            
            this.setCollision();
            
            if (this.isPieceInBounds(
                this.piece.instance,
                this.piece.x,
                this.piece.y - 1)) {

                this.piece.y -= 1;
            } else {
                this.piece.isColliding = true;
            }
        },

        reset: function Tetris_reset() {
            this.piece.isColliding = false;
            this.piece.x = this._options.pieceDefault.x;
            this.piece.y = this._options.pieceDefault.y;

            this.pieceContainer.resetPiece(this.piece.instance.name);

            this.pieceQueue.pop();
            this.pieceQueue.push(this.pieceContainer.rndPiece());
        },
        
        setCollision: function Tetris_setCollision() {
            return false;  
        },

        isPieceInBounds: function Tetris_isPieceInBounds(piece, x, y) {
            var self = this;
            var boundsOk = true;

            piece.grid.forEach(function (_x, _y, block) {
                if(block.isSolid != true) {
                    return;
                }
                
                boundsOk = boundsOk && self.well.contains(
                    x + _x, y + _y);
            });

            return boundsOk;
        },

        movePieceLeft: function Tetris_movePieceLeft() {
            if (this.isPieceInBounds(
                this.piece.instance,
                this.piece.x - 1,
                this.piece.y)) {

                this.piece.x -= 1;
            }
        },

        movePieceRight: function Tetris_movePieceRight() {
            if (this.isPieceInBounds(
                this.piece.instance,
                this.piece.x + 1,
                this.piece.y)) {

                this.piece.x += 1;
            }
        },

        rotatePieceLeft: function Tetris_rotatePieceLeft() {
            this.pieceContainer.rotate(this.getPiece().name, 'left');
            
             if (!this.isPieceInBounds(
                    this.piece.instance,
                    this.piece.x,
                    this.piece.y)) {

                this.pieceContainer.rotate(this.getPiece().name, 'right');
            }
        },

        rotatePieceRight: function Tetris_rotatePieceRight() {
            this.pieceContainer.rotate(this.getPiece().name, 'right');
            
             if (!this.isPieceInBounds(
                    this.piece.instance,
                    this.piece.x,
                    this.piece.y)) {

                this.pieceContainer.rotate(this.getPiece().name, 'left');
            }      
        },

        getPiece: function Tetris_getPiece() {
            return this.pieceContainer.getPiece(this.piece.instance.name);
        },

        getPieceLocation: function Tetris_getPieceLocation() {
            var x = this.piece.x;
            var y = this.piece.y;

            return { 'x': x, 'y': y };
        }
    };
    
    return Tetris;
});
