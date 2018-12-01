export enum ButtonState {
    enabled,
    disabled
}

export type ButtonBase = {
    title: string,
    tooltip: string,
    state: ButtonState,
    id: string,
}

export class Button {
    attr: ButtonBase

    constructor(bb: ButtonBase) {
        this.attr = bb
    }

    updateState(newState: ButtonState) {
        if (newState === ButtonState.enabled) {
            $('#' + this.attr.id).removeAttr('disabled')
        }

        if (newState === ButtonState.disabled)
        {
            $('#' + this.attr.id).attr("disabled", "disabled");
        }
        this.attr.state = newState
    }

    enable() {
        this.updateState(ButtonState.enabled)
    }

    disable() {
        this.updateState(ButtonState.disabled)
    }
}

export class ButtonGroup {
    buttons: Button[] = []

    constructor(arrButton: Button[]) {
        this.buttons = this.buttons.concat(arrButton)
    }

    protected updateAll(newState: ButtonState) {
        this.buttons.forEach((e) => {
            e.updateState(newState)
        })

    }

    enable(index: number) {
        if (index < 0 || index >= this.buttons.length) {
            console.debug('index error')
            return
        }

        this.updateAll(ButtonState.disabled)
        this.buttons[index].enable()
    }

    disable(index: number) {
        if (index < 0 || index >= this.buttons.length) {
            console.debug('index error')
            return
        }

        this.updateAll(ButtonState.enabled)
        this.buttons[index].disable()
    }
}

export interface HashButtonGroup {
   [name: string]: ButtonGroup
}
