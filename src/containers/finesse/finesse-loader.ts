// Here define all finesse and its gadget basic global variable and
const log_prefix = 'flog_'

const flog = (...params) => {
    console.log(log_prefix + '[----------')
    for(let param of params) {
        console.log(param)
    }
    console.log(log_prefix + '---------]-')
}


class jFinesse {
   finesse: object
   gadget: object
   constructor(window){
       console.log('flog', window)
       this.finesse = window.finesse || {}
       this.gadget = this.finesse.gadget || {}

       console.log('flog', 'my finesse', this.finesse, this.gadget)
   }

   print() {
       flog(this.finesse)
   }
}

export {
    flog,
    jFinesse
}
