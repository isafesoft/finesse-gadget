import { flog, jFinesse } from "./containers/finesse/finesse-loader";

function component() {
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'hi3'

    return element;
}


let obj = {name: 'mark', gender: 'gender'}
if (window.hasOwnProperty('finesse')) {
    console.log('flog_, has own property', window)
}

document.body.appendChild(component());

export function testExport() {
    console.log('h1')
    let jf = new jFinesse(window)
    flog(jf)
    jf.print()
    console.log('h2')
}

// module.exports = {
//     testExport
// };


const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;
