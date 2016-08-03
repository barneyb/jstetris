function Deferred() {
    this._promise = new Promise()
}
Deferred.prototype.promise = function promise() {
    return this._promise;
};
Deferred.prototype.resolve = function resolve(value) {
    this._promise._resolve(value);
    return this;
};
Deferred.prototype.reject = function reject(reason) {
    this._promise._reject(reason);
    return this;
};
Deferred.prototype.update = function update(value) {
    this._promise._update(value);
    return this;
};

if (typeof module != 'undefined' && module && module.exports) {
    module.exports = Deferred;
}
