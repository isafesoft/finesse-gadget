"use strict";
exports.__esModule = true;
// Here define all finesse and its gadget basic global variable and
var log_prefix = 'flog_';
var flog = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.log(log_prefix + '[----------');
    for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
        var param = params_1[_a];
        console.log(param);
    }
    console.log(log_prefix + '---------]-');
};
exports.flog = flog;
var jFinesse = /** @class */ (function () {
    function jFinesse(window) {
        this.finesse = window.finesse;
    }
    jFinesse.prototype.print = function () {
        console.log(this.finesse);
    };
    return jFinesse;
}());
exports.jFinesse = jFinesse;
