var Promise = require("../Promise");
var Deferred = require("../Deferred");

exports.resolved = Promise.resolve;
exports.rejected = Promise.reject;
exports.deferred = function() {
    var d = new Deferred();
    return {
        promise: d.promise(),
        resolve: d.resolve.bind(d),
        reject: d.reject.bind(d)
    };
};
