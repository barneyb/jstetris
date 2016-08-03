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
        return new Promise(function(r) { r(value); });
    };
    Promise.rejected = function rejected(reason) {
        return new Promise(function(_, r) { r(reason); });
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
        if (this.state == FULFILLED) {
            p.value = onResolve == undefined ? this.value : onResolve(this.value);
            p.state = FULFILLED;
        } else if (this.state == REJECTED) {
            p.value = onReject == undefined ? this.value : onReject(this.value);
            p.state = REJECTED;
        } else {
            this.resolveHandlers.push(onResolve);
            this.rejectHandlers.push(onReject);
            this.updateHandlers.push(onUpdate);
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
        var self = this;
        setTimeout(function() {
            if (self.state != PENDING) {
                return;
            }
            self.state = FULFILLED;
            self.value = value;
            self.resolveHandlers.forEach(function(it, i) {
                var val = self.value;
                var method = "_resolve";
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        val = e;
                        method = "_reject";
                    }
                }
                self.chain[i][method](val);
            });
            self.resolveHandlers = null;
            self.rejectHandlers = null;
            self.updateHandlers = null;
        });
    };
    Promise.prototype._reject = function _reject(reason) {
        if (this.state != PENDING) {
            return;
        }
        var self = this;
        setTimeout(function() {
            if (self.state != PENDING) {
                return;
            }
            self.state = REJECTED;
            self.value = reason;
            self.rejectHandlers.forEach(function(it, i) {
                var val = self.value;
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        val = e;
                    }
                }
                self.chain[i]._reject(val);
            });
            self.resolveHandlers = null;
            self.rejectHandlers = null;
            self.updateHandlers = null;
        });
    };
    Promise.prototype._update = function _update(value) {
        if (this.state != PENDING) {
            throw new Error("Only pending promises can be updated.");
        }
        var self = this;
        setTimeout(function() {
            if (self.state != PENDING) {
                return;
            }
            self.updateHandlers.forEach(function(it, i) {
                var val = value;
                if (it != undefined) {
                    try {
                        val = it.call(undefined, val);
                    } catch (e) {
                        return;
                    }
                }
                self.chain[i]._update(val);
            })
        });
    };
    return Promise;
}());

if (typeof module != 'undefined' && module.exports) {
    module.exports = Promise;
}
