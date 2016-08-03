Promise = (function() {
    var PENDING = 'pending',
        FULFILLED = 'fulfilled',
        REJECTED = 'rejected';
    function Promise(work) {
        this.value = undefined;
        this.state = PENDING;
        // four parallel arrays. Ick.
        this.chain = [];
        this.resolveHandlers = [];
        this.rejectHandlers = [];
        this.updateHandlers = [];
        work && work(this._resolve.bind(this), this._reject.bind(this), this._update.bind(this));
    }
    Promise.resolved = function resolved(value) {
        var p = new Promise();
        p.value = value;
        p.state = FULFILLED;
        return p;
    };
    Promise.rejected = function rejected(reason) {
        var p = new Promise();
        p.value = reason;
        p.state = REJECTED;
        return p;
    };
    Promise.prototype.then = function then(onResolve, onReject, onUpdate) {
        if (typeof onResolve != 'function') {
            onResolve = undefined;
        }
        if (typeof onReject != 'function') {
            onReject = undefined;
        }
        if (typeof onUpdate != 'function') {
            onUpdate = undefined;
        }
        if (onResolve == undefined && onReject == undefined) {
            if (onUpdate != undefined) {
                this.updateHandlers.push(onUpdate);
            }
            return this;
        }
        var p = new Promise();
        if (this.state == PENDING) {
            this.resolveHandlers.push(onResolve);
            this.rejectHandlers.push(onReject);
            this.updateHandlers.push(onUpdate);
        } else {
            setTimeout(function() {
                if (this.state == FULFILLED) {
                    p._resolve(onResolve == undefined ? this.value : onResolve(this.value));
                } else if (this.state == REJECTED) {
                    p._reject(onReject == undefined ? this.value : onReject(this.value));
                }
            }.bind(this));
        }
        this.chain.push(p);
        return p;
    };
    Promise.prototype._resolve = function _resolve(value) {
        if (this.state != PENDING) {
            return;
        }
        if (this === value) {
            throw new TypeError("Resolving a promise with itself is disallowed (")
        }
        if (value instanceof Promise) {
            value.then(this._resolve.bind(this), this._reject.bind(this));
            return;
        }
        try {
            var _then = value.then;
            if (typeof _then == 'function') {
                _then.call(value, this._resolve.bind(this), this._reject.bind(this));
                return;
            }
        } catch (e) {
            if (this.state == PENDING) {
                this._reject(e);
            }
            return;
        }
        setTimeout(function() {
            if (this.state != PENDING) {
                return;
            }
            this.state = FULFILLED;
            this.value = value;
            this.resolveHandlers.forEach(function(it, i) {
                var val = this.value;
                var method = "_resolve";
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        val = e;
                        method = "_reject";
                    }
                }
                this.chain[i][method](val);
            }.bind(this));
            this.resolveHandlers = null;
            this.rejectHandlers = null;
            this.updateHandlers = null;
        }.bind(this));
    };
    Promise.prototype._reject = function _reject(reason) {
        if (this.state != PENDING) {
            return;
        }
        setTimeout(function() {
            if (this.state != PENDING) {
                return;
            }
            this.state = REJECTED;
            this.value = reason;
            this.rejectHandlers.forEach(function(it, i) {
                var val = this.value;
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        val = e;
                    }
                }
                this.chain[i]._reject(val);
            }.bind(this));
            this.resolveHandlers = null;
            this.rejectHandlers = null;
            this.updateHandlers = null;
        }.bind(this));
    };
    Promise.prototype._update = function _update(value) {
        if (this.state != PENDING) {
            throw new Error("Only pending promises can be updated.");
        }
        setTimeout(function() {
            if (this.state != PENDING) {
                return;
            }
            this.updateHandlers.forEach(function(it, i) {
                var val = value;
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        return;
                    }
                }
                this.chain[i]._update(val);
            }.bind(this))
        }.bind(this));
    };
    return Promise;
}());

if (typeof module != 'undefined' && module.exports) {
    module.exports = Promise;
}
