// Here define all finesse and its gadget basic global variable and
const log_prefix = 'flog_'

const flog = (...params) => {
    console.log(log_prefix + '[----------')
    for(let param of params) {
        console.log(param)
    }
    console.log(log_prefix + '---------]-')
}

interface InitCallBacks{
    onLoad: any,
    onChange: any,
    onAdjustWindowHeight: any
}

class FinesseLoader {
   finesse: any
   gadget: any
    user: any
    states: any
    dialogs: any
    clientLogs: any
    containerServices: any
    callBacks: InitCallBacks

   constructor(window: any, initCallBacks: InitCallBacks){
       //console.log('flog constructor', window)
       this.finesse = window.finesse || {}
       this.gadget = this.finesse.gadget || {}
       this.callBacks = initCallBacks

       this.init()
       //console.log('flog construct', 'my finesse', this.finesse, this.gadget, this.user)
   }

   onLoad() {
       console.log('onload')
   }

   onChange() {
       console.log('on change')
   }

    /**
     * Handler for the onLoad of a User object. This occurs when the User object is initially read
     * from the Finesse server. Any once only initialization should be done within this function.
     */
    handleUserLoad(userevent) {
        // Get an instance of the dialogs collection and register handlers for dialog additions and
        // removals
        console.log('handleUserLoad', userevent)
        this.dialogs = this.user.getDialogs( {
            onCollectionAdd : this.onLoad,
            onCollectionDelete : this.onChange
        });
    }

    /**
     *  Handler for all User updates
     */
    handleUserChange(userevent) {
        console.log( 'handleUserChange2', userevent)
    };

    handleError(userevent) {
        console.log( 'handleError', userevent)
    };

    public static delay(ms: number = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async delayLoad() {
        console.log('delay start')
        await FinesseLoader.delay(3000)
        console.log('delay end')
    }

    async init() {
        let cfg = this.gadget.Config;
        this.callBacks.onAdjustWindowHeight()
        //gadgets.window.adjustHeight();

       try {

            this.clientLogs = this.finesse.cslogger.ClientLogger;
           // Initiate the ClientServices and load the user object. ClientServices are
           // initialized with a reference to the current configuration.
           this.finesse.clientservices.ClientServices.init(cfg, false);

           // Initiate the ClientLogs. The gadget id will be logged as a part of the message
           //clientLogs.init(gadgets.Hub, "LearningSampleGadget");

           this.user = new this.finesse.restservices.User({
               id: cfg.id,
               onLoad: this.handleUserLoad,
               onLoadError: this.handleError,
               onChange: this.handleUserChange
           });

           console.log('delay start')
           await FinesseLoader.delay(3000)
           console.log('delay end')
           let ext = this.user.getExtension()
           this.states = this.finesse.restservices.User.States;
           //this.user.setState(this.states.READY)


           //let res = this.user.setState(this.states.READY)
           //console.log('set states, res:', res)

           // Initiate the ContainerServices and add a handler for when the tab is visible
           // to adjust the height of this gadget in case the tab was not visible
           // when the html was rendered (adjustHeight only works when tab is visible)
           this.containerServices = this.finesse.containerservices.ContainerServices.init();
           this.containerServices.addHandler(this.finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, () => {
               console.log("flog_, Gadget is now visible");  // log to Finesse logger
               // automatically adjust the height of the gadget to show the html
               //gadgets.window.adjustHeight();
               this.callBacks.onAdjustWindowHeight()
               console.log('flog, user_extention2: ', this.user.getExtension())

           });

           //console.log('flog, user_extention: ', this.user.getExtension())
           this.containerServices.makeActiveTabReq();
       }
       catch (e) {
          console.log('flog_ exception: init, ', e)
       }
    }
}

export {
    flog,
    FinesseLoader,
    InitCallBacks
}
