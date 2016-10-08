import {
    DETAIL_TRANSITION_DATA
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

// export function clearUserReposPage() {
//     return (dispatch,getState)=>{
//
//         return dispatch({type: CLEAR_USER_REPOS_PAGE});
//
//     }
// }

const initialState = fromJS({
  startPosition : { top: 0, left: 0, right: 0 },
  repoData      : {}
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
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(initialState,ACTION_HANDLERS)
