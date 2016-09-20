import {
    TRIGGER_LOAD_ANIMATION,
    TRIGGER_LOAD_ANIMATION_DONE,
    TRIGGER_LOAD_ANIMATION_HIDE,
    TRIGGER_LOAD_ANIMATION_FAILED,
    TRIGGER_LOAD_ANIMATION_RESET
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
  showLoading : false,
  doneLoading : true,
  loadFailed  : false
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TRIGGER_LOAD_ANIMATION] : (state, action) => {
    return state.merge({
      showLoading : true,
      doneLoading : false,
      loadFailed  : false
    })
  },
  [TRIGGER_LOAD_ANIMATION_DONE] : (state, action) => {
    return state.merge({
      showLoading : true,
      doneLoading : true,
      loadFailed  : false
    })
  },
  [TRIGGER_LOAD_ANIMATION_HIDE] : (state, action) => {
    return state.merge({
      showLoading : false,
      doneLoading : false,
      loadFailed  : false
    })
  },
  [TRIGGER_LOAD_ANIMATION_FAILED] : (state, action) => {
    return state.merge({
      showLoading : true,
      doneLoading : false,
      loadFailed  : true
    })
  },
  [TRIGGER_LOAD_ANIMATION_RESET] : (state, action) => {
    return state.merge({
      showLoading : false,
      doneLoading : false,
      loadFailed  : false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function loadingBlockReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
