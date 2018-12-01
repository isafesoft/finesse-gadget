import {FinesseLoader} from "./finesse-loader";
import {USER_STATE_READY, USER_STATE_NOT_READY} from "../../constat";

export class UserState {
    finesse: FinesseLoader = undefined
    idReady: string = undefined
    idNotReady: string = undefined

    constructor(finesse: FinesseLoader, idReady: string, idNotReady: string) {
        this.finesse = finesse
        this.idReady = idReady
        this.idNotReady = idNotReady
    }

    setState(newState: string) {
        try {
            console.log('setState [')
            console.log(this.finesse)
            console.log('getState:->', this.finesse.user.getState())
            console.log('user->', this.finesse.user)

            if (USER_STATE_READY === newState) {
                this.finesse.user.setState(this.finesse.states.READY)
            } else if (USER_STATE_NOT_READY === newState) {
                this.finesse.user.setState(this.finesse.states.NOT_READY)
            }
        } catch (e) {
            console.log('setState exception,', e)
        }
    }

}