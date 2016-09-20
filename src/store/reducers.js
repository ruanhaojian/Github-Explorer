import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import UserPageReducer from '../routes/UserPage/modules/UserPage'

import loadingBlockReducer from '../routes/CoreLayout/modules/LoadingBlock'
import menuOpenStateReducer from '../routes/CoreLayout/modules/MenuOpenStateHandler'
import menuFullStateReducer from '../routes/CoreLayout/modules/MenuFullStateHandler'
import navMenuReducer from '../routes/CoreLayout/modules/NavMenu'
// import repoListReducer from '../routes/CoreLayout/modules/RepoList'
import coreLayoutReducer from '../routes/CoreLayout/modules/CoreLayout'
// import repoDetailReducer from '../routes/CoreLayout/modules/RepoDetail'
import mainContentReducer from '../routes/CoreLayout/modules/MainContent'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    coreLayoutReducer,
    mainContentReducer,
    navMenuReducer,
    loadingBlockReducer,
    menuOpenStateReducer,
    menuFullStateReducer,
    UserPageReducer,
    // repoListReducer,
    // repoDetailReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
