define(function () {
    function Block(isSolid, color) {
        this.isSolid = isSolid;
        this.color = color || 'grey'
    };
    
    Block.prototype = {
        constructor: Block
    }
    
    return Block;
});