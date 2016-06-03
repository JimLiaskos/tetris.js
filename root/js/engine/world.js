define(function(require) {
    var $           = require('jquery');
    var Tetris      = require('game/tetris');
    var Controller  = require('engine/controller');
    var Graphics    = require('engine/graphics');
    
    var difficulty      = require('game/difficulty');    
    
    function setUpControls(controller) {
        var $body = $('body');

        var eventMap = {
            37: function onMoveLeft() {     // left arrow,  keyCode: 37
                controller.fireMoveLeftEvent();
            },

            39: function onMoveRight() {    // right arrow, keyCode: 39
                controller.fireMoveRightEvent();
            },

            81: function onRotateLeft() {   // q,           keyCode: 81
                controller.fireRotateLeftEvent();
            },

            87: function onRotateRight() {  // w,           keyCode: 87
                controller.fireRotateRightEvent();
            }
        };

        $body.keydown(function (event) {
            eventMap[event.keyCode] && eventMap[event.keyCode]();
        });
    };
    
    function setUpEvents(controller, tetris) {  
        controller.addOnMoveLeftListener(function() { tetris.movePieceLeft(); });
        controller.addOnMoveRightListener(function() { tetris.movePieceRight(); });
        controller.addOnRotateLeftListener(function() { tetris.rotatePieceLeft(); });
        controller.addOnRotateRightListener(function() { tetris.rotatePieceRight(); });
        
        controller.addOnDescendListener(function() { tetris.round(); });
    };
    
    function World() {
        this._roundLoop     = undefined;
        this._animateLoop   = undefined;
        
        this._tetris        = new Tetris();
        this._graphics      = new Graphics();
        this._controller    = new Controller();
        
        setUpControls  (this._controller);
        setUpEvents    (this._controller, this._tetris);
    }
    
    World.prototype = {
        constructor: World,
        
        beginGame: function World_beginGame() {
            this.paintStep();
            this.setLevel(1);
        },
        
        paintStep : function World_paintStep() {
            var self = this;
            self._graphics.paintWell(this._tetris)
            
            self._animateLoop = window.requestAnimationFrame(function () {
                self.paintStep();
            });
        },
        
        setLevel: function World_setLevel(levelNum) {
            var self = this;
            var level = 'Level' + levelNum;
            
            if(!difficulty[level]) {
                throw "Not found level '" + levelNum + "'";
            }
            
            window.clearInterval(self._roundLoop);
            
            self._tetris.frequency = difficulty[level];
            
            self._roundLoop = setInterval(function() {
                self._controller.fireDescendEvent();
            }, (1 / self._tetris.frequency) * 1000);
        }
    };
    
    return World;
});
