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
    function jFinesse(window, initCallBacks) {
        console.log('flog', window);
        this.finesse = window.finesse || {};
        this.gadget = this.finesse.gadget || {};
        this.callBacks = initCallBacks;
        console.log('flog', 'my finesse', this.finesse, this.gadget);
        this.init();
    }
    jFinesse.prototype.init = function () {
        var _this = this;
        var cfg = this.gadget.Config;
        this.callBacks.onAdjustWindowHeight();
        //gadgets.window.adjustHeight();
        // Initiate the ClientServices and load the user object. ClientServices are
        // initialized with a reference to the current configuration.
        this.finesse.clientservices.ClientServices.init(cfg, false);
        // Initiate the ClientLogs. The gadget id will be logged as a part of the message
        //clientLogs.init(gadgets.Hub, "LearningSampleGadget");
        this.user = new this.finesse.restservices.User({
            id: cfg.id,
            onLoad: this.callBacks.onLoad,
            onChange: this.callBacks.onChange
        });
        this.states = this.finesse.restservices.User.States;
        // Initiate the ContainerServices and add a handler for when the tab is visible
        // to adjust the height of this gadget in case the tab was not visible
        // when the html was rendered (adjustHeight only works when tab is visible)
        var containerServices = this.finesse.containerservices.ContainerServices.init();
        containerServices.addHandler(this.finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, function () {
            //clientLogs.log("Gadget is now visible");  // log to Finesse logger
            // automatically adjust the height of the gadget to show the html
            //gadgets.window.adjustHeight();
            _this.callBacks.onAdjustWindowHeight();
        });
        containerServices.makeActiveTabReq();
    };
    jFinesse.prototype.print = function () {
        flog(this.finesse);
    };
    return jFinesse;
}());
exports.jFinesse = jFinesse;
