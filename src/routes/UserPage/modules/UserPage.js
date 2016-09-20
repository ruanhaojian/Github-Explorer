import {
    REQUEST_RANDOM_USER,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REPOS_RECEIVED,
    CLEAR_USER_PAGE
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
  profile : {},
  repos   : []
})

export function clearUserPage () {
  return (dispatch, getState) => {
    return dispatch({ type: CLEAR_USER_PAGE })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_PROFILE_RECEIVED] : (state, action) => {
    return state.merge({
      profile : action.data
    })
  },
  [USER_PROFILE_REPOS_RECEIVED] : (state, action) => {
    return state.merge({
      repos : action.data
    })
  },
  [CLEAR_USER_PAGE] : (state, action) => {
    return state.merge({
      profile : {},
      repos   : []
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
