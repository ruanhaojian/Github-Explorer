import {
    TOGGLE_NAV_MENU,
    OPEN_NAV_MENU,
    CLOSE_NAV_MENU
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
  open : false
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_NAV_MENU] : (state, action) => {
    return state.merge({
      open : !state.toJS().open
    })
  },
  [OPEN_NAV_MENU] : (state, action) => {
    return state.merge({
      open : true
    })
  },
  [CLOSE_NAV_MENU] : (state, action) => {
    return state.merge({
      open : false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function moduleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
