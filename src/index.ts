import {FinesseLoader, InitCallBacks} from "./containers/finesse/finesse-loader";
import {UserState} from "./containers/finesse/user-state";
import {USER_STATE_NOT_READY} from "./constat";
import {Button, ButtonBase, ButtonGroup, ButtonState, HashButtonGroup} from "./components/button";

function component() {
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'hi3'

    return element;
}


let obj = {name: 'mark', gender: 'gender'}
if (window.hasOwnProperty('finesse')) {
    //console.log('flog_, has own property', window)
}

document.body.appendChild(component());

const userLoad = () => {
    console.log('user load')
}

const userChange = () => {
    console.log('user change')
}

const adjustHeight = () => {
    console.log('adjust height')
}

const callBacks: InitCallBacks = {onLoad: userLoad, onChange: userChange, onAdjustWindowHeight: adjustHeight}

/*
var jf  = undefined
try {
    jf = new FinesseLoader(window, callBacks);
    console.log('flog, create FinesseLoader ok', jf)
}
catch (e) {
    console.log('flog, init log', e)
}
*/

export function init(): FinesseLoader {
    return new FinesseLoader(window, callBacks);
}

export function initToolBar(buttons: object): any {
    let keys: string[] = Object.keys(buttons)
    let values: any= Object.values(buttons)
    let hashBtnGroup: (any)[] = []

    for (let i = 0; i < keys.length; i++) {
        let arrBtn: Button[] = []
        for (let j = 0; j < values[i].length; j++) {
            let button = values[i][j]
            let btnBase: ButtonBase = {
                title: button.title, state: button.state, id: button.id,
                tooltip: button.tooltip
            }
            arrBtn.push(new Button(btnBase))
        }

        let btnGroup: ButtonGroup = new ButtonGroup(arrBtn)
        hashBtnGroup.push({[keys[i]]: btnGroup})
    }
    return hashBtnGroup
}

export function enableOneButton(index: number, arrBtnGrp: any, grpName: string) {
    debugger
    let btnGrp = <ButtonGroup[]>arrBtnGrp.filter((ele) => {
        return ele.hasOwnProperty(grpName)
    })
    //console.log(btnGrp)
    if (btnGrp.length > 0) {
        //let bg = btnGrp[0][grpName] instanceof ButtonGroup
        //console.log(bg)
        let bg = btnGrp[0][grpName]
        bg.enable(index)
    } else {
        console.debug('0 buttonGroup find, ' + grpName)
    }
}

export function setState(jf, newState) {
    let us: UserState = undefined
    try {
        //console.log('set user state')
        us = new UserState(jf, 'ready', 'notready')
        us.setState(newState)
    } catch (e) {
        console.log('exception, setState, ', e)
    }
   console.log('flog, test2')
}

export function getState(jf): string {
    let us: UserState = undefined
    let state: string = undefined
    try {
        //console.log('set user state')
        us = new UserState(jf, 'ready', 'notready')
        state = us.getState()
    } catch (e) {
        console.log('exception, getState, ', e)
    }
    return state.toUpperCase()
}

/*
export function setState() {
    let jf  = undefined
    let us = undefined
    try {
        us = new UserState(jf, 'ready', 'not_ready')

        us.setState(USER_STATE_NOT_READY)
    }
    catch (e) {
        console.log('flog, init log', e)
    }
}*/

// module.exports = {
//     testExport
// };


const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
(<any>window).iAmJavascriptES6 = iAmJavascriptES6;
