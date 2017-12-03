module.exports = function (babel) {
    const { types: t } = babel;

    return {
        name: "remove-console-log",
        visitor: {
            CallExpression(path) {

            /*    if(!path.node){
                    return false;
                }

                if(!path.node.callee){
                    return false;
                }

                if(!path.node.callee.object){
                    return false;
                }

                const isConsole = path.node.callee.object.name === 'console';

                const hasPropertyLog = path.node.callee.property.name === 'log';*/

                const isConsole = hasNameConsole(path);

                if(!isConsole){
                    return;
                }

                const isLog = hasPropertyLog(path);

                if(isLog){
                    path.remove();
                }
            }
        }
    };

    function hasNameConsole(path){
        if(!path.node){
            return false;
        }

        if(!path.node.callee){
            return false;
        }

        if(!path.node.callee.object){
            return false;
        }

        return path.node.callee.object.name === 'console';
    }

    function hasPropertyLog(path){
        if(!hasNameConsole(path)){
            return false;
        }

        return path.node.callee.property.name === 'log';
    }
};
