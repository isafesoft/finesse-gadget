"use strict";
exports.__esModule = true;
var finesse_loader_1 = require("./containers/finesse/finesse-loader");
function component() {
    var element = document.createElement('div');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'hi2';
    return element;
}
var obj = { name: 'mark', gender: 'gender' };
if (window.hasOwnProperty('finesse')) {
    console.log('flog_, has own property', window);
}
document.body.appendChild(component());
function testExport() {
    console.log('h1');
    finesse_loader_1.flog('hi, from flog');
    var jf = new finesse_loader_1.jFinesse(window.finesse || {});
    console.log('h2');
}
exports.testExport = testExport;
// module.exports = {
//     testExport
// };
var arr = [1, 2, 3];
var iAmJavascriptES6 = function () { return console.log.apply(console, arr); };
window.iAmJavascriptES6 = iAmJavascriptES6;
