import {
    USERS_RECEIVED,
    USERS_REQUEST
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({
  users     : [],
  searching : true
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USERS_RECEIVED] : (state, action) => {
    return state.merge({
      users     : action.data,
      searching : false
    })
  },
  [USERS_REQUEST] : (state, action) => {
    return state.merge({
      searching : true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(initialState,ACTION_HANDLERS)
