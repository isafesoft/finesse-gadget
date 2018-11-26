// Here define all finesse and its gadget basic global variable and
const log_prefix = 'flog_'

var f = {}
if(window.hasOwnProperty('finesse'))
{
    f = window.finesse
}

f.gadget = f.gadget || {}; 
f.container = f.container || {}; 

f.log = (...params) => {
    console.log(log_prefix + '[----------')
    for(let param of params) {
        console.log(param)
    }
    console.log(log_prefix + '---------]-')
}

export {
    f
}
