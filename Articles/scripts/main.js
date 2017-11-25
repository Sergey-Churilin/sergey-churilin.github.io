let requesterInstance = null;
let application = null;
let errorHandlerInstance = null;

document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        application.onButtonGetArticlePress();
    }
    return false;
};

window.onload = function(){
    init();
};

function init(){
    application = new Application();
    application.createLayout();
}





