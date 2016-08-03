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
    Promise.prototype.then = function then(onFulfilled, onRejected, onUpdated) {
        if (typeof onFulfilled != 'function') {
            onFulfilled = undefined;
        }
        if (typeof onRejected != 'function') {
            onRejected = undefined;
        }
        if (typeof onUpdated != 'function') {
            onUpdated = undefined;
        }
        if (onFulfilled == undefined && onRejected == undefined) {
            if (onUpdated != undefined) {
                this.updateHandlers.push(onUpdated);
            }
            return this;
        }
        var p = new Promise();
        if (this.state == PENDING) {
            this.resolveHandlers.push(onFulfilled);
            this.rejectHandlers.push(onRejected);
            this.updateHandlers.push(onUpdated);
        } else {
            setTimeout(function() {
                try {
                    if (this.state == FULFILLED) {
                        p._resolve(onFulfilled == undefined ? this.value : onFulfilled(this.value))
                    } else if (this.state == REJECTED) {
                        if (onRejected == undefined) {
                            p._reject(this.value);
                        } else {
                            p._resolve(onRejected(this.value));
                        }
                    }
                } catch (e) {
                    p._reject(e)
                }
            }.bind(this));
        }
        this.chain.push(p);
        return p;
    };
    Promise.prototype._resolve = function _resolve(x) {
        if (this.state != PENDING) {
            return;
        }
        if (this === x) {
            throw new TypeError("Resolving a promise with itself is disallowed")
        }
        if (x instanceof Promise) {
            x.then(this._resolve.bind(this), this._reject.bind(this));
            return;
        }
        if (x != null && (typeof x == 'object' || typeof x == 'function')) {
            try {
                var _then = x.then;
                if (typeof _then == 'function') {
                    _then.call(x, this._resolve.bind(this), this._reject.bind(this));
                    return;
                }
            } catch (e) {
                if (this.state == PENDING) {
                    this._reject(e);
                }
                return;
            }
        }
        setTimeout(function() {
            if (this.state != PENDING) {
                return;
            }
            this.state = FULFILLED;
            this.value = x;
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
    Promise.prototype._reject = function _reject(r) {
        if (this.state != PENDING) {
            return;
        }
        setTimeout(function() {
            if (this.state != PENDING) {
                return;
            }
            this.state = REJECTED;
            this.value = r;
            this.rejectHandlers.forEach(function(it, i) {
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
