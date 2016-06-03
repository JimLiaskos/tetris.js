requirejs.config({

    baseUrl: 'js',

    paths: {
        'jquery': 'jquery/jquery-1.11.3',
        'jquery-private': 'jquery/jquery-private'
    },

    map: {
        '*': { 'jquery': 'jquery-private' },

        'jquery-private': { 'jquery': 'jquery' }
    }
});

function init($, World) {
    var world = new World();
    
    world.beginGame();
};

requirejs(['jquery', 'engine/world'], init);
