import {
    TOGGLE_NAV_MENU,
    BACK_BUTTON,
    TRIGGER_LOAD_ANIMATION,
    TRIGGER_LOAD_ANIMATION_DONE,
    TRIGGER_LOAD_ANIMATION_HIDE,
    TRIGGER_LOAD_ANIMATION_FAILED,
    TRIGGER_LOAD_ANIMATION_RESET
} from '../../../actions/types'


export function toggleNavMenu() {
    return (dispatch,getState)=>{

        return dispatch({type: TOGGLE_NAV_MENU});

    }
}
export function backButton(backRoute) {
    return (dispatch,getState)=>{

        return dispatch({type: BACK_BUTTON, backRoute: backRoute});

    }
}

export function triggerLoadAnimation() {
    return (dispatch,getState)=>{

        dispatch({type: TRIGGER_LOAD_ANIMATION_RESET})
        setTimeout(() => {
            return dispatch({type: TRIGGER_LOAD_ANIMATION})
        }, 100)

        // return dispatch({type: TRIGGER_LOAD_ANIMATION})
    }
}
export function triggerLoadAnimationDone() {
    return (dispatch,getState)=>{

        return dispatch({type: TRIGGER_LOAD_ANIMATION_DONE});

    }
}
export function triggerLoadAnimationHide() {
    return (dispatch,getState)=>{

        return dispatch({type: TRIGGER_LOAD_ANIMATION_HIDE});

    }
}
export function triggerLoadAnimationFailed() {
    return (dispatch,getState)=>{

        return dispatch({type: TRIGGER_LOAD_ANIMATION_FAILED});

    }
}