define(function(require) {
    var Grid            = require('util/grid');
    var Block           = require('game/block');    
    var PieceContainer  = require('game/pieceContainer');
    
    Tetris.PIECE_CNT = 4;
    
    function peek(array) {
        return array && array.length && array[array.length - 1];    
    }
    
    function Tetris(options) {
        var self = this;

        options = options || {};
       
        var defaultOptions = {
            'pieceDefault'	: { 'x': 3, 'y': 19 },
            'frequency' 	: options.frequency 	|| 1,
            'wellWidth'		: options.wellWidth 	|| 10,
            'wellHeight'	: options.wellHeight 	|| 30
        };

        this._options 		= defaultOptions;
        
        this.frequency 		= defaultOptions.frequency;

        this.pieceContainer = new PieceContainer();
        this.pieceQueue 	= new Array(Tetris.PIECE_CNT);
        this.well 			= new Grid(defaultOptions.wellWidth, defaultOptions.wellHeight);

        for(var i = 0; i < Tetris.PIECE_CNT ; i++) {
            this.pieceQueue.push(this.pieceContainer.rndPiece());
        }

        this.currentPiece = {
            'x' : defaultOptions.pieceDefault.x,
            'y' : defaultOptions.pieceDefault.y
        };

        Object.defineProperty(this.currentPiece, "instance", {
            get: function () { 
                return self.pieceContainer.getPiece(peek(self.pieceQueue));
            }
        });

        this.well.forEach(function(x, y) {
            this.set(x, y, new Block(false, x % 2 ? 'lightgray' : 'gray'));
        });
    };

    Tetris.prototype.round = function Tetris_round() {
        if(this.isPieceInBounds(
            this.currentPiece.x,
            this.currentPiece.y - 1)) {

            this.currentPiece.y -= 1;
        }
    };

    Tetris.prototype.reset = function Tetris_reset() {
        this.currentPiece.x = this._options.pieceDefault.x;
        this.currentPiece.y = this._options.pieceDefault.y;

        this.pieceContainer.resetPiece(this.currentPiece.instance.name);

        this.pieceQueue.pop();
        this.pieceQueue.push(this.pieceContainer.rndPiece());
    };

    Tetris.prototype.isPieceInBounds = function Tetris_isPieceInBounds(x, y) {
        var self = this;
        var boundsOk = true;
        var piece = self.currentPiece.instance;

        piece.grid.forEach(function(x, y) {
            boundsOk = boundsOk && self.well.contains(
                self.currentPiece.x + x, 
                self.currentPiece.y + y);
        });

        return boundsOk;
    };

    Tetris.prototype.movePieceLeft = function Tetris_movePieceLeft() {
        if(this.isPieceInBounds(
            this.currentPiece.x - 1,
            this.currentPiece.y)) {

            this.currentPiece.x -= 1;
        }
    };

    Tetris.prototype.movePieceRight = function Tetris_movePieceRight() {
        if(this.isPieceInBounds(
            this.currentPiece.x + 1,
            this.currentPiece.y)) {

            this.currentPiece.x += 1;
        }
    };

    Tetris.prototype.getPiece = function Tetris_getPiece() {
        return this.pieceContainer.getPiece(this.currentPiece.instance.name);
    };

    Tetris.prototype.getPieceLocation = function Tetris_getPieceLocation() {
        var x = this.currentPiece.x;
        var y = this.currentPiece.y;

        return { 'x': x, 'y' : y };
    };
    
    return Tetris;
});
