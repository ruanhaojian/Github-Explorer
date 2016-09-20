import {
    FULL_NAV_MENU,
    OPEN_NAV_MENU,
    CLOSE_NAV_MENU
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
  full : false
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FULL_NAV_MENU] : (state, action) => {
    return state.merge({
      full : true
    })
  },
  [CLOSE_NAV_MENU] : (state, action) => {
    return state.merge({
      full : false
    })
  },
  [OPEN_NAV_MENU] : (state, action) => {
    return state.merge({
      full : false
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
