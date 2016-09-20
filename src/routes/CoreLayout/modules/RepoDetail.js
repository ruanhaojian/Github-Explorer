import {
    REPO_DETAIL_RECEIVED,
    REPO_README_RECEIVED,
    REPO_CONTRIS_RECEIVED,
    REPO_LANGUAGES_RECEIVED,
    DETAIL_TRANSITION_DATA,
    REPO_DETAIL_REQUEST_PAGE_FAILED,
    REPO_DETAIL_RECEIVED_ALL,
    CLEAR_REPO_DETAIL_PAGE
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

export function clearRepoDetailPage () {
  return (dispatch, getState) => {
    return dispatch({ type: CLEAR_REPO_DETAIL_PAGE })
  }
}

const initialState = fromJS({
  startPosition : { top: 0, left: 0, right: 0 },
  repoData      : {},

  loadFailed : false,
  repo       : {},
  readme     : '',
  contribs   : [],
  contents   : [],
  languages  : []
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DETAIL_TRANSITION_DATA] : (state, action) => {
    return state.merge({
      startPosition : action.startPosition,
      repoData      : action.repoData
    })
  },
  [REPO_DETAIL_REQUEST_PAGE_FAILED] : (state, action) => {
    return state.merge({
      loadFailed : true
    })
  },
  [REPO_DETAIL_RECEIVED_ALL] : (state, action) => {
    var { repo, readme, contribs, contents, languages } = action.data

    return state.merge({
      loadFailed : false,
      repo,
      readme,
      contribs,
      contents,
      languages
    })
  },
  [CLEAR_REPO_DETAIL_PAGE] : (state, action) => {
    return state.merge({
      loadFailed : false,
      repo       : {},
      readme     : '',
      contribs   : [],
      contents   : [],
      languages  : []
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
