var Promise = require("../Promise");
var Deferred = require("../Deferred");

exports.resolved = Promise.resolved;
exports.rejected = Promise.rejected;
exports.deferred = function() {
    return new Deferred();
};
