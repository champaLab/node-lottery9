"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BigInt.prototype.toJSON = function () {
    try {
        return parseInt(this.toString());
    }
    catch (e) { }
    return this.toString();
};
