function EventDispatcher() {
    this.handlerMap = {};
}
EventDispatcher.prototype.on = function on(event, handler) {
    if (this.handlerMap.hasOwnProperty(event)) {
        this.handlerMap[event].push(handler);
    } else {
        this.handlerMap[event] = [handler];
    }
};
EventDispatcher.prototype.off = function off(event, handler) {
    if (! this.handlerMap.hasOwnProperty(event)) {
        return;
    }
    var handlers = this.handlerMap[event];
    for (var i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i] == handler) {
            handler.splice(i, 1);
        }
    }
};
EventDispatcher.prototype.trigger = function trigger(event, arg1, arg2, argN) {
    if (! this.handlerMap.hasOwnProperty(event)) {
        return;
    }
    var handlers = this.handlerMap[event];
    for (var i = 0, l = handlers.length; i < l; i++) {
        handlers[i].apply(null, Array.prototype.slice.call(arguments, 1));
    }
};
