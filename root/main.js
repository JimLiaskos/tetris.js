requirejs.config({

    baseUrl: 'js',
    
    paths: {
        jquery: 'jquery/jquery-1.11.3'
    },

    map: {
        '*': { 'jquery': 'jquery-private' },
        
        'jquery-private': { 'jquery': 'jquery' }
    }
});

requirejs(['jquery', 'game/tetris'], function ($, Tetris) {
    var t = new Tetris();

    console.log(t);
    console.log($);
})