function Deferred() {
    this.promise = new Promise()
}
Deferred.prototype.resolve = function resolve(value) {
    this.promise._resolve(value);
    return this;
};
Deferred.prototype.reject = function reject(reason) {
    this.promise._reject(reason);
    return this;
};
Deferred.prototype.update = function update(value) {
    this.promise._update(value);
    return this;
};

if (typeof module != 'undefined' && module && module.exports) {
    module.exports = Deferred;
}
