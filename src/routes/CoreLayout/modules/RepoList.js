import {
    USER_REPOS_COMPLETE,
    USER_REPOS_RECEIVED,
    USER_REPOS_REQUEST,
    USER_REPOS_NEXT_PAGE_RECEIVED,
    CLEAR_USER_REPOS_PAGE
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

export function clearUserReposPage () {
  return (dispatch, getState) => {
    return dispatch({ type: CLEAR_USER_REPOS_PAGE })
  }
}

const initialState = fromJS({
  page        : 1,
  repos       : [],
  isSearching : false,
  complete    : false
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CLEAR_USER_REPOS_PAGE] : (state, action) => {
    return state.merge({
      isSearching : false,
      repos       : [],
      page        : 1,
      complete    : false
    })
  },
  [USER_REPOS_REQUEST] : (state, action) => {
    return state.merge({
      isSearching : true,
      repos       : action.page === 1 ? [] : state.toJS().repos
    })
  },
  [USER_REPOS_COMPLETE] : (state, action) => {
    return state.merge({
      complete : true
    })
  },
  [USER_REPOS_RECEIVED] : (state, action) => {
    return state.merge({
      repos       : action.data,
      isSearching : false,
      emptyData   : action.data.length === 0 && state.toJS().page === 1
    })
  },
  [USER_REPOS_NEXT_PAGE_RECEIVED] : (state, action) => {
    return state.merge({
      page        : action.data.page,
      repos       : state.toJS().repos.concat(action.data.repos),
      isSearching : false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(initialState,ACTION_HANDLERS)
