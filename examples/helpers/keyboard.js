var jetpack = jetpack || {};

jetpack.keyboard = function() {
    var keyCode = 0;
    
    var handleKeyDown = function(e) {
        //cross browser issues exist
        if (!e) {
            var e = window.event;
        }
        keyCode = e.keyCode;
    };

    var handleKeyUp = function(e) {
        keyCode = 0;
    };

    init = function() {
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        document.onmousedown = handleKeyDown;
        document.onmouseup = handleKeyUp;
    };

    init();

    return {
        // zwracamy funkcje, gdyz dzieki temu tworzymy 
        // closure - jedyny sposob dzieki ktoremu bedziemy 
        // mieli dostep do aktualnej wartosci zmiennej "code"
        
        spacebar: function() {
            return keyCode === 32 ? true : false;
        },
        getKeyCode: function() {
            return keyCode;
        }
    };
}();

