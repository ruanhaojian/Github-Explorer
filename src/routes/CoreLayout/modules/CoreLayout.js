import {
    CLOSE_NAV_MENU,
    OPEN_NAV_MENU,
    FULL_NAV_MENU,
    BACK_BUTTON,
    UPDATE_CORE_DATA
} from '../../../actions/types'
import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { matchParams } from '../../../utils/routes'

export function openNavMenu () {
  return (dispatch, getState) => {
    return dispatch({ type: OPEN_NAV_MENU })
  }
}
export function closeNavMenu () {
  return (dispatch, getState) => {
    return dispatch({ type: CLOSE_NAV_MENU })
  }
}
export function fullNavMenu () {
  return (dispatch, getState) => {
    return dispatch({ type: FULL_NAV_MENU })
  }
}
export function updateCoreData (scrollTop) {
  return (dispatch, getState) => {
    return dispatch({
      type : UPDATE_CORE_DATA,
      scrollTop
    })
  }
}

const initialState = fromJS({
  backActionCount : 0,
  backRoute       : '/',
    // router: '/',
    // children: document.createElement('div')
  scrollTop       : 0
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BACK_BUTTON] : (state, action) => {
    return state.merge({
      backActionCount : state.toJS().backActionCount + 1,
      backRoute       : action.backRoute
    })
  },
  [UPDATE_CORE_DATA] : (state, action) => {
        // console.log('ssfsfsefsef====> ' + action.scrollTop)
    return state.merge({
      scrollTop : action.scrollTop
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
// export default function moduleReducer (state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]
//
//   return handler ? handler(state, action) : state
// }

export default createReducer(initialState,ACTION_HANDLERS)
